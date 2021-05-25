const controlador = {};
const Compras = require('../../database/models/compras');
const { id } = require('../Albumes/controlador');


controlador.get = async(req, res) => {
    if (req.headers['access-token']) {
        console.log(req.query);
        var compra = await Compras.findOne({
            where: {
                external_reference: req.query.external_reference
            }
        });
        if (compra && await compra.getDataValue('pymentid') == null) {
            compra = await Compras.update({
                pymentid: await req.query.payment_id,
                status: req.query.status
            }, {
                where: {
                    id: await compra.getDataValue('id')
                }
            });
            res.status(200).send(compra);
        } else {
            res.status(200).send({ mensaje: 'la compra ya esta cargada!!' })
        }
    } else {
        res.status(203).send();
    }
}

module.exports = controlador;