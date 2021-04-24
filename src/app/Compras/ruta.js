const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador);

module.exports = ruta;