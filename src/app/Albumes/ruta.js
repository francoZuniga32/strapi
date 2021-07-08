const ruta = require("express").Router();
const controlador = require("./controlador");

ruta.get("/", controlador.get);
module.exports = ruta;