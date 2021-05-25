const controlador = {};
const Instrumental = require('../../database/models/instrumentales');
const sequelize = require('../../database/index');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const Vendedores = require('../../database/models/vendedores');
const mercadopago = require('mercadopago');
const Files = require('../../database/models/files');
const Compras = require('../../database/models/compras');
const ComprasInstrumental = require('../../database/models/carritos_instrumentales');
const Instrumentales = require('../../database/models/instrumentales');

/**
 * mostramos de forma paginada los datos de los instrumentales
 * @param {*} req 
 * @param {*} res 
 */
controlador.get = async(req, res) => {
    if (req.query != undefined) {
        var page = req.query.page;
        var cantidad = 30;
        var inicio = cantidad * (page - 1);
        var sqlInstrumentales = `SELECT * FROM Instrumentales LIMIT ?,?`;

        var instrumentales = await sequelize.query(sqlInstrumentales, {
            replacements: [inicio, cantidad],
            type: QueryTypes.SELECT
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
        var instrumental = await sequelize.query('SELECT * FROM Instrumentales WHERE Instrumentales.id = ?', {
            replacements: [instrumentalid],
            type: QueryTypes.SELECT
        });
        (instrumental != null) ? res.status(200).json(instrumental): res.status(203).send();
    } else {
        res.status(204).send();
    }
}

controlador.instrumental.user = async(req, res) => {
    if (req.params.id != undefined) {
        var instrumetal = await Instrumental.findAll({
            where: {
                vendedor: req.params.id
            }
        })
        if (instrumetal) res.status(200).send(instrumetal);
        else res.status(204).send();
    } else {
        res.status(203).send();
    }
}

controlador.instrumental.me = async(req, res) => {
    if (req.headers['access-token']) {
        console.log("instrumentales propios")
        var decoded = jwt.decode(req.headers['access-token'], process.env.CLAVE);
        var instrumental = await Instrumental.findAll({
            where: {
                vendedor: decoded.usuario.id
            }
        });

        if (instrumental) res.status(200).send(instrumental);
        else res.status(204).send();
    } else {
        res.status(203).send();
    }
}

controlador.instrumental.buy = async(req, res) => {
    if (req.params.id && req.headers['access-token']) {
        var vendedor = await sequelize.query("SELECT * FROM Instrumentales, Vendedores WHERE Instrumentales.vendedor = Vendedores.idusuario AND Vendedores.idusuario = ?", {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
        });

        var instrumental = await Instrumentales.findOne({
            where: {
                id: req.params.id
            }
        });

        var comprador = jwt.verify(req.headers['access-token'], process.env.CLAVE);
        if (vendedor && vendedor[0].mercadopago != undefined && instrumental) {
            vendedor[0].mercadopago = JSON.parse(vendedor[0].mercadopago);
            console.log(vendedor[0].mercadopago.body);
            mercadopago.configure({
                access_token: vendedor[0].mercadopago.body.access_token
            });

            var preference = {
                items: [{
                    title: vendedor[0].nombre,
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: vendedor[0].precio
                }],
                back_urls: {
                    success: 'http://localhost:3000/compras/',
                    pending: 'http://localhost:3000/compras/',
                    failure: 'http://localhost:3000/compras/'
                }
            };
            preference.marketplace_fee = await porcentaje(vendedor[0].precio);

            var compra = await Compras.create({
                usuario: comprador.usuario.id
            });
            preference.external_reference = compra.getDataValue('external_reference');
            var idcompra = await compra.getDataValue('id');

            await sequelize.query('INSERT INTO `Carritos-Instrumentales`(`idcompra`, `idinstrumental`, `createdAt`, `updatedAt`) VALUES (?,?,?,?)', {
                replacements: [await compra.getDataValue('id'), req.params.id, new Date(), new Date()],
                type: QueryTypes.INSERT
            });

            mercadopago.preferences.create(preference).then(data => {
                res.status(200).send({ "body": data });
            });
        } else {
            res.status(203).send();
        }
    } else {
        res.status(203).send();
    }
}

/**
 * instanciamos un instrumental por su id
 * @param {*} res 
 * @param {*} req 
 */
controlador.set = async(req, res) => {
    console.log(req.body);
    if (req.body != undefined && req.headers['access-token']) {
        var decoded = jwt.decode(req.headers['access-token'], process.env.CLAVE);

        var mp3 = await sequelize.query('SELECT * FROM Files WHERE Files.id = ?', { replacements: [req.body.mp3], type: QueryTypes.SELECT });
        var wav = await sequelize.query('SELECT * FROM Files WHERE Files.id = ?', { replacements: [req.body.wav], type: QueryTypes.SELECT });
        var sample = await sequelize.query('SELECT * FROM Files WHERE Files.id = ?', { replacements: [req.body.sample], type: QueryTypes.SELECT });
        var minuatura = await sequelize.query('SELECT * FROM Files WHERE Files.id = ?', { replacements: [req.body.minuatura], type: QueryTypes.SELECT });

        var instrumental = await Instrumental.findOrCreate({
            where: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                categoria: req.body.categoria,
                minuatura: minuatura[0].url,
                bpm: req.body.bpm,
                escala: req.body.escala,
                mp3: mp3[0].url,
                wav: wav[0].url,
                sample: sample[0].url,
                vendedor: decoded.usuario.id,
                licencia: req.body.licencia,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        console.log(instrumental)
        if (instrumental) res.status(200).json(instrumental);
        else res.status(203).send({ "mensaje": "hubo un error al crear el instrumental" });
    } else {
        res.status(203).send();
    }
}

controlador.put = async(req, res) => {
    if (req.body != undefined) {
        var instrumental = await Instrumental.update({ id: req.body.id }, {
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
            licencia: req.body.licencia,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(instrumental);
        if (instrumental) res.status(200).send(instrumental);
        else res.status(204).send();
    } else {
        res.status(203).send();
    }
}

controlador.delate = async(req, res) => {
    if (req.body != undefined) {
        var instrumental = await Instrumental.destroy({
            where: { id: req.body.id }
        });
        console.log(instrumental);
        if (instrumental) res.status(200).send(instrumental);
        else res.status(204).send();
    } else {
        res.status(203).send();
    }
}

async function porcentaje(precio) {
    const porcentaje = 5;
    var retorno = (porcentaje / 100) * precio;
    return parseFloat(retorno);
}

module.exports = controlador;