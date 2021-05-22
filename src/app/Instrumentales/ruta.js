const ruta = require('express').Router();
const controlador = require('./controlador');

ruta.get('/', controlador.get);
ruta.get('/id/:id', controlador.instrumental.get);
ruta.get('/user/:id', controlador.instrumental.user);
ruta.get('/me', controlador.instrumental.me);
ruta.get('/buy/:id', controlador.instrumental.buy);

ruta.post('/create', controlador.set);

ruta.put('/', controlador.put);
ruta.delete('/', controlador.delate);

module.exports = ruta;