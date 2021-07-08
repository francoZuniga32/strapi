const controlador = {};
const Compras = require("../../database/models/compras");
const Instrumental = require("../../database/models/instrumentales");
const ComprasInstrumental = require("../../database/models/carritos_instrumentales");
const Vendedores = require("../../database/models/vendedores");
const { id } = require("../Albumes/controlador");
const mercadopago = require("mercadopago");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Carritos_Instrumentales = require("../../database/models/carritos_instrumentales");

const path = require("path");
const fs = require("fs");
const zip = new require("node-zip")();
const crypto = require("crypto");

controlador.get = async(req, res) => {
    var usuario = jwt.verify(req.headers["access-token"], process.env.CLAVE);

    var compras = await Compras.findAll({
        where: {
            usuario: usuario.usuario.id,
        },
        order: ["id"],
    });
    //instrumentales
    console.log(compras[0]);
    for (let i = 0; i < compras.length; i++) {
        const compra = compras[i];
    }
    res.send(compras);
};

controlador.set = async(req, res) => {
    if (req.headers["access-token"]) {
        console.log(req.query);
        var compra = await Compras.findOne({
            where: {
                external_reference: req.query.external_reference,
            },
        });
        if (compra && (await compra.getDataValue("pymentid")) == null) {
            compra = await Compras.update({
                pymentid: await req.query.payment_id,
                status: req.query.status,
            }, {
                where: {
                    id: await compra.getDataValue("id"),
                },
            });
            res.status(200).send(compra);
        } else {
            res.status(200).send({ mensaje: "la compra ya esta cargada!!" });
        }
    } else {
        res.status(203).send();
    }
};

controlador.carga = async(req, res) => {
    if (req.headers["access-token"] && req.query.external_reference) {
        var comprador = jwt.verify(req.headers["access-token"], process.env.CLAVE);
        console.log(comprador.usuario.id);
        var compra = await Compras.findOne({
            where: {
                external_reference: req.query.external_reference,
                usuario: comprador.usuario.id,
            },
        });
        var vendedor = await Vendedores.findOne({
            where: {
                idusuario: await compra.getDataValue("vendedor"),
            },
            attributes: ["idusuario", "mercadopago"],
        });

        if (compra && vendedor) {
            var access_token = JSON.parse(await vendedor.getDataValue("mercadopago"))
                .body.access_token;
            mercadopago.configure({
                access_token: access_token,
            });

            mercadopago.payment
                .search({
                    qs: {
                        external_reference: req.query.external_reference,
                    },
                })
                .then(async(data) => {
                    if (data.body.results.length > 0) {
                        var compraUpdate = await Compras.update({
                            pymentid: data.body.results[0].id,
                            status: data.body.results[0].status,
                        }, {
                            where: {
                                id: compra.getDataValue("id"),
                            },
                        });

                        res.status(200).send(compra);
                    } else {}
                })
                .catch((err) => {
                    console.log(err);
                    res.status(401).send();
                });
        } else {
            res.send(401).send({ err: "falta el external_reference param" });
        }
    }
};

controlador.instrumental = {};
controlador.instrumental.download = async(req, res) => {
    if (req.query.id != undefined) {
        var compra = await Compras.findOne({
            where: {
                id: req.query.id,
            },
        });

        if (
            compra.getDataValue("tipo") == 1 &&
            compra.getDataValue("status") == "approved"
        ) {
            //consultamos por el instrumental comprado
            var instrumental_carrito = await Carritos_Instrumentales.findOne({
                where: {
                    idcompra: compra.getDataValue("id"),
                },
                attributes: ["idcompra", "idinstrumental"],
            });
            var instrumental = await Instrumental.findOne({
                where: {
                    id: instrumental_carrito.getDataValue("idinstrumental"),
                },
                attributes: ["nombre", "mp3", "wav", "sample"],
            });
            var mp3 = instrumental.getDataValue("mp3").split("/").pop();
            var wav = instrumental.getDataValue("wav").split("/").pop();

            zip.file(
                `${instrumental.getDataValue("nombre")}.mp3`,
                fs.readFileSync(
                    path.join(__dirname, `../../public/instrumental/mp3/${mp3}`)
                )
            );
            zip.file(
                `${instrumental.getDataValue("nombre")}.wav`,
                fs.readFileSync(
                    path.join(__dirname, `../../public/instrumental/wav/${wav}`)
                )
            );
            var data = zip.generate({ base64: false, compression: "DEFLATE" });
            var nombrezip = `${crypto
        .createHash("sha1")
        .update(instrumental.getDataValue("nombre"))
        .digest("hex")}.zip`;
            var ruta = `../../public/download/${nombrezip}`;
            fs.writeFileSync(path.join(__dirname, nombrezip), data, "binary");
            res.send(`http://localhost:3000/static/download/${nombrezip}`);
        } else {
            res.status(204).send();
        }
    } else {
        res.status(204).send();
    }
};

module.exports = controlador;