const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador.get);
ruta.get('/:id', controlador.instrumental.get);
ruta.get('/user/:id', controlador.instrumental.user);
ruta.get('/me', controlador.instrumental.me);

ruta.post('/create', controlador.instrumental.post);

ruta.put('/', controlador.instrumental.put);
ruta.delete('/', controlador.instrumental.delate);

module.exports = ruta;