const controlador = {};
const mercadopago = require("mercadopago");
const Vendedores = require("../../database/models/vendedores");
const Usuario = require("../../database/models/usuarios");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../../database/models/vendedores");
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

controlador.mercadopago = {};

controlador.mercadopago.auth = async(req, res) => {
    var url = "http://localhost:3001/perfil/mercadopago";
    var app = process.env.MP_CLIENTID;
    res.send(
        `https://auth.mercadopago.com.ar/authorization?client_id=${app}&response_type=code&platform_id=mp&redirect_uri=${url}`
    );
};

controlador.mercadopago.conect = async(req, res) => {
    if (req.query.code != undefined && req.headers["access-token"] != undefined) {
        console.log(req.query.code);
        var vendedor = jwt.verify(req.headers["access-token"], process.env.CLAVE);
        mercadopago.connect
            .getCredentials(
                process.env.ACCESS_TOKEN,
                req.query.code,
                "http://localhost:3001/perfil/mercadopago"
            )
            .then(async(result) => {
                var data = result;
                console.log(data);
                var vendedorUpdate = await Vendedores.update({ mercadopago: data }, {
                    where: {
                        idusuario: vendedor.usuario.id,
                    },
                });
                var vendedorData = await Vendedores.findOne({
                    attributes: ["banner", "mercadopago"],
                    where: { idusuario: vendedor.usuario.id },
                });
                res.status(200).json(vendedorData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

controlador.setbaner = async(req, res) => {};

module.exports = controlador;