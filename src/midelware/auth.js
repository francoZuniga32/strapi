const sequelize = require('../database/index');
const jwt = require('jsonwebtoken');
const Usuario = require('../database/models/usuarios');
const { QueryTypes } = require('sequelize');

const auth = async(req, res, next) => {
    if (req.headers['access-token']) {
        var token = req.headers['access-token'];
        var decoded = jwt.verify(token, process.env.CLAVE);
        console.log(decoded);
        var row = await Usuario.findOne({
            where: {
                token: decoded
            }
        });
        if (row.length > 0) {
            next();
        } else {
            res.status(203).json({ "mensaje": "el usuario no esta registrado" });
        }
    } else {
        res.status(203).send({ "mensaje": "no esta provisto el token" });
    }
}

module.exports = auth;