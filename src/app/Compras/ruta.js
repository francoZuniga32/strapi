const ruta = require("express").Router();
const controlador = require("./controlador");

ruta.get("/", controlador.get);
ruta.post("/", controlador.set);
ruta.get("/carga", controlador.carga);
ruta.get("/instrumental/download", controlador.instrumental.download);

module.exports = ruta;