const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})

const controlador = {};
const Usuario = require('../../database/models/usuarios')

controlador.register = async(req, res) => {
    console.log(req.body);
    if (req.body != undefined) {
        var data = {
            nombreusuario: req.body.nombreusuario,
            email: req.body.email,
            contraseña: sha256(req.body.contraseña),
            foto: null
        }
        var row = await Usuario.create(data);
        res.json(row);
    } else {
        res.status(204).send();
    }
}

controlador.auth = async(req, res) => {
    if (req.body != undefined) {
        if (req.body.email != undefined && req.body.contraseña != undefined) {
            var usuario = await Usuario.findOne({
                where: {
                    email: req.body.email,
                    contraseña: req.body.contraseña
                }
            });
            if (!usuario) {
                res.status(203).json({
                    "mensaje": "el usuario no esta registrado"
                });
            } else {

                //creamos el toke de usuario
                const token = jwt.sign({ "usuario": usuario }, process.env.CLAVE, {
                    expiresIn: '3h'
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
}

function sha256(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64');
}

module.exports = controlador;