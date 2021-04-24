const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.post('/mp3', controlador.mp3);
ruta.post('/wav', controlador.wav);
ruta.post('/sample', controlador.sample);
ruta.post('/miniatura', controlador.minuatura);
ruta.post('/baner', controlador.baner);

module.exports = ruta;