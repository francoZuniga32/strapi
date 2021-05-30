const ruta = require("express").Router();
const controlador = require("./controlador");

ruta.get("/", controlador.get);
ruta.get("/carga", controlador.carga);

module.exports = ruta;