const sequelize = require("../database/index");
const jwt = require("jsonwebtoken");
const Usuario = require("../database/models/usuarios");
const { QueryTypes } = require("sequelize");

const auth = async(req, res, next) => {
    if (req.headers["access-token"]) {
        var token = req.headers["access-token"];
        try {
            var decoded = jwt.verify(token, process.env.CLAVE);
            var row = await Usuario.findOne({
                where: {
                    token: decoded.usuario.token,
                },
            });
            if (row) {
                next();
            } else {
                res.status(203).json({ mensaje: "el usuario no esta registrado" });
            }
        } catch (error) {
            res.status(401).send({ err: error });
        }
    } else {
        res.status(203).send({ mensaje: "no esta provisto el token" });
    }
};

module.exports = auth;