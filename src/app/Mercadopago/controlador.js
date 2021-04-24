const controlador = {};
const mercadopago = require('mercadopago');
const Usuario = require('../../database/models/usuarios');
const jwt = require('jsonwebtoken');
const { response } = require('express');

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})

controlador.get = async(req, res) => {
    mercadopago.connect.sendAuthorizationCode(process.env.MP_CLIENTID, 'http://localhost:3000/mercadopago/getcredenciales').then(result => {
        res.send(result);
    });
};

controlador.getcredenciales = async(req, res) => {
    console.log(req.query.token);
    mercadopago.connect.getCredentials(process.env.ACCESS_TOKEN, req.query.code, 'http://localhost:3000/mercadopago/getcredenciales').then(result => {
        console.log(result.response);
        res.json(result.response);
    }).catch(err => {
        res.status(204).json(err);
    });
}

controlador.setcredentials = async(req, res) => {
    res.send(req.body);
}

module.exports = controlador;