const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador.get);
ruta.post('/create', controlador.instrumental.post);

module.exports = ruta;