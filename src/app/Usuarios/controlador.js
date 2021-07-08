const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

const controlador = {};
const Usuario = require("../../database/models/usuarios");
const Vendedor = require("../../database/models/vendedores");
const sequelize = require("../../database/index");
const { QueryTypes } = require("sequelize");

controlador.register = async(req, res) => {
    console.log(req.body);
    if (req.body != undefined) {
        var usuario = await Usuario.findOne({
            where: {
                nombreusuario: req.body.nombre,
                contraseña: req.body.contrasenia,
            },
        });
        console.log(usuario);
        if (usuario == null) {
            var row = await Usuario.create({
                nombreusuario: req.body.nombre,
                email: req.body.email,
                contraseña: req.body.contrasenia,
                foto: null,
            });

            const token = jwt.sign({ usuario: row }, process.env.CLAVE, {
                expiresIn: "3h",
            });
            row.token = token;
            if (req.body.productor) {
                const vendedor = await sequelize.query(
                    "INSERT INTO `Vendedores`(`idusuario`, `createdAt`, `updatedAt`) VALUES (?,?,?)", {
                        replacements: [
                            await row.getDataValue("id"),
                            new Date(),
                            new Date(),
                        ],
                        type: QueryTypes,
                    }
                );
            }
            res.json(row);
        } else {
            res.status(203).send();
        }
    } else {
        res.status(204).send();
    }
};

controlador.auth = async(req, res) => {
    if (req.body != undefined) {
        if (req.body.email != undefined && req.body.contraseña != undefined) {
            var usuario = await Usuario.findOne({
                where: {
                    email: req.body.email,
                    contraseña: req.body.contraseña,
                },
            });
            if (!usuario) {
                res.status(203).json({
                    mensaje: "el usuario no esta registrado",
                });
            } else {
                var vendedor = await Vendedor.findOne({
                    attributes: ["idusuario", "banner", "mercadopago"],
                    where: {
                        idusuario: usuario.getDataValue("id"),
                    },
                });

                if (vendedor != null) {
                    usuario.setDataValue("vendedor", true);
                    usuario.setDataValue("banner", vendedor.getDataValue("banner"));
                } else {
                    usuario.setDataValue("vendedor", false);
                }
                //creamos el toke de usuario
                console.log(usuario);
                const token = jwt.sign({ usuario: usuario }, process.env.CLAVE, {
                    expiresIn: "3h",
                });
                usuario.token = token;
                res.json(usuario);
            }
        } else {
            res.status(204).send();
        }
    } else {
        res.status(204).send();
    }
};

function sha256(pwd) {
    return crypto.createHash("sha256").update(pwd).digest("hex");
}

module.exports = controlador;