const jwt = require('jsonwebtoken');
const Vendedores = require('../database/models/vendedores');

const auth = async(req, res, next) => {
    if (req.headers['access-token']) {
        var token = req.headers['access-token'];
        jwt.verify(token, process.env.CLAVE, async(err, decoded) => {
            if (err) {
                res.status(203).send(err);
            } else {
                console.log(decoded.usuario);
                var vendedor = await Vendedores.findOne({
                    attributes: ['idusuario'],
                    where: {
                        idusuario: decoded.usuario.id
                    }
                });
                if (vendedor) next();
                else res.status(203).json({ "mensaje": "el usuario no es un vendedor" });
            }
        });
    } else {
        res.status(203).send({ "mensaje": "no esta provisto el token" });
    }
}

module.exports = auth;