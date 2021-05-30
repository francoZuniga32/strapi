const controlador = {};
const Compras = require("../../database/models/compras");
const Instrumental = require("../../database/models/instrumentales");
const ComprasInstrumental = require("../../database/models/carritos_instrumentales");
const Vendedores = require("../../database/models/vendedores");
const { id } = require("../Albumes/controlador");
const mercadopago = require("mercadopago");
const axios = require("axios");
const jwt = require("jsonwebtoken");

controlador.get = async(req, res) => {
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

module.exports = controlador;