const controlador = {};
const Instrumental = require('../../database/models/instrumentales');
const Files = require('../../database/models/files');
const { Op } = require('sequelize');

/**
 * mostramos de forma paginada los datos de los instrumentales
 * @param {*} req 
 * @param {*} res 
 */
controlador.get = async(req, res) => {
    if (req.query != undefined) {
        var page = req.query.page;
        var cantidad = 30;
        var inicio = (cantidad * (page - 1) == 0) ? 1 : cantidad * (page - 1);

        await Instrumental.findAll({
            attributes: [

            ],
            where: {
                id: inicio,
            },
            limit: cantidad
        }).then((resultado) => {
            instrumentales = resultado;
        });
        res.status(200).json(instrumentales);
    } else {
        res.status(204).send();
    }
}

controlador.instrumental = {};

/**
 * obtenemos las informacion de un instrumental por su id
 * @param {*} req 
 * @param {*} res 
 */
controlador.instrumental.get = async(req, res) => {
    if (req.params != undefined) {
        var instrumentalid = req.params.id;
        var instrumental = await Instrumental.findOne({
            where: {
                id: instrumentalid
            }
        });
        (instrumental != null) ? res.status(200).json(instrumental): res.status(203).send();
    } else {
        res.status(204).send();
    }
}

/**
 * instanciamos un instrumental por su id
 * @param {*} res 
 * @param {*} req 
 */
controlador.instrumental.post = async(req, res) => {
    console.log(req.body);
    if (req.body != undefined) {
        var instrumental = await Instrumental.findOne({
            where: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                categoria: req.body.categoria,
                minuatura: req.body.minuatura,
                bpm: req.body.bpm,
                escala: req.body.escala,
                mp3: req.body.mp3,
                wav: req.body.wav,
                sample: req.body.sample,
                vendedor: req.body.vendedor,
                licencia: req.body.licencia,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }).then();
        console.log(instrumental)
        if (!instrumental) {
            instrumental = await Instrumental.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                categoria: req.body.categoria,
                minuatura: req.body.minuatura,
                bpm: req.body.bpm,
                escala: req.body.escala,
                mp3: req.body.mp3,
                wav: req.body.wav,
                sample: req.body.sample,
                vendedor: req.body.vendedor,
                licencia: req.body.licencia,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then();
            if (instrumental) res.status(200).json(instrumental);
            else res.status(203).send({ "mensaje": "hubo un error al crear el instrumental" });
        } else {
            res.status(203).send({ "mensaje": "El instrumental ya existe" });
        }
    } else {
        res.status(203).send();
    }
}

module.exports = controlador;