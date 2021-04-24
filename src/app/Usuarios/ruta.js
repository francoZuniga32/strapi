const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.post('/register', controlador.register);
ruta.post('/auth', controlador.auth);

module.exports = ruta;