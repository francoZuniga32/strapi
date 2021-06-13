const jwt = require("jsonwebtoken");
const Vendedores = require("../database/models/vendedores");

const auth = async(req, res, next) => {
    console.log(req.headers["access-token"]);
    if (req.headers["access-token"]) {
        var token = req.headers["access-token"];
        try {
            var decoded = jwt.verify(token, process.env.CLAVE);

            var vendedor = await Vendedores.findOne({
                attributes: ["idusuario"],
                where: {
                    idusuario: decoded.usuario.id,
                },
            });
            if (vendedor != null) {
                next();
            } else {
                res.status(203).json({ mensaje: "el usuario no es un vendedor" });
            }
        } catch (error) {
            res.status(401).send({ error: error });
        }
    } else {
        res.status(203).send({ mensaje: "no esta provisto el token" });
    }
};

module.exports = auth;