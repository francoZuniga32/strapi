const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador.get);
ruta.get('/getcredenciales', controlador.getcredenciales);
ruta.post('/getcredenciales', controlador.setcredentials)

module.exports = ruta;