const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/mercadopago/', controlador.mercadopago.auth);
ruta.get('/mercadopago/setcredentials', controlador.mercadopago.conect);

module.exports = ruta;