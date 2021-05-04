const controlador = {};
const Albumes = require('../../database/models/albumes');

controlador.get = async(res, res) => {
    if (req.query != undefined) {
        var page = req.query.page;
        var cantidad = 10;
        var inicio = (cantidad * (page - 1) == 0) ? 1 : cantidad * (page - 1);

        await Albumes.findAll({
            where: {
                id: inicio
            },
            limit: cantidad
        }).then(result => {
            var albumes = result;
        }).catch(err => {
            res.status(203).send({ "mensaje": err });
        })
        res.status(200).send(albumes);
    } else {
        res.status(204).send();
    }
}



module.exports = controlador;