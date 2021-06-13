const controlador = {};
const Albumes = require("../../database/models/albumes");
const sequelize = require("../../database/index");
const { QueryTypes, AsyncQueueError } = require("sequelize");

controlador.get = async(req, res) => {
    if (req.query != undefined) {
        var page = req.query.page;
        var cantidad = 10;
        var inicio = cantidad * (page - 1);

        var Albumes = await sequelize.query("SELECT * FROM Albumes LIMIT ?,?", {
            replacements: [inicio, cantidad],
            type: QueryTypes.SELECT,
        });

        if (Albumes) {
            for (let i = 0; i < Albumes.length; i++) {
                Albumes[i].instrumentales = await sequelize.query(
                    "SELECT Instrumentales.* FROM Instrumentales, `Contiene-Instrumentales` WHERE `Contiene-Instrumentales`.`idinstrumental` = Instrumentales.id AND `Contiene-Instrumentales`.`idalbum` = ?", {
                        replacements: [Albumes[i].id],
                        type: QueryTypes.SELECT,
                    }
                );
            }
        }
        res.status(200).send(Albumes);
    } else {
        res.status(204).send();
    }
};

controlador.id = async(req, res) => {
    if (req.params.id != undefined) {
        var row = await Albumes.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).send(row);
    } else {
        res.status(203).send();
    }
};

controlador.user = async(req, res) => {
    if (req.params.id != undefined) {
        var row = await Albumes.findAll({
            where: {
                vendedor: req.param.id,
            },
        });
        res.status(200).send(row);
    } else {
        res.status(203).send();
    }
};

controlador.buy = async(req, res) => {
    if (req.params.id != undefined) {}
};

controlador.me = async(req, res) => {
    if (req.headers["access-token"]) {
        console.log("instrumentales propios");
        var decoded = jwt.decode(req.headers["access-token"], process.env.CLAVE);
        var row = await Albumes.findAll({
            where: {
                vendedor: decoded.usuario.id,
            },
        });
        res.status(200).send(row);
    } else {
        res.status(203).send();
    }
};

controlador.set = async(req, res) => {
    if (req.body != undefined) {
        var data = req.body;
        var album = await sequelize.query(
            "SELECT * FROM Albumes WHERE Albumes.nombre = ?", {
                replacements: [data.nombre],
                type: QueryTypes.SELECT,
            }
        );
        var minuatura = await sequelize.query(
            "SELECT * FROM Files WHERE Files.id = ? AND Files.tipe = 'minuatura'", { replacements: [data.minuatura], type: QueryTypes.SELECT }
        );
        var sample = await sequelize.query(
            "SELECT * FROM Files WHERE Files.id = ? AND Files.tipe = 'dample'", { replacements: [data.sample], type: QueryTypes.SELECT }
        );
        var licencia = await sequelize.query(
            "SELECT * FROM Licencias WHERE Licencias.id = ?", { replacements: [data.instrumentales], type: QueryTypes.SELECT }
        );
        if (album && minuatura && sample && licencia) {
            album = await sequelize.query(
                "INSERT INTO Albumes(id, nombre, descripcion, precio, categoria, minuatura, sample, vendedor, licencia, createdAt, updatedAt) VALUES (null,?,?,?,?,?,?,?,?,?,?)", {
                    replacements: [
                        data.nombre,
                        data.descripcion,
                        data.precio,
                        data.categoria,
                        minuatura[0].url,
                        sample.url,
                        data.vendedor,
                        licencia.url,
                        new Data(),
                        new Date(),
                    ],
                    type: QueryTypes.INSERT,
                }
            );

            for (let i = 0; i < data.instrumentales.length; i++) {
                const instrumental = data.instrumentales[i];
                await sequelize.query(
                    "INSERT INTO `Contiene-Instrumentales`(`idalbum`, `idinstrumental`, `createdAt`, `updatedAt`) VALUES (?,?,?,?)", {
                        replacements: [album[0], instrumental, new Date(), new Date()],
                        type: QueryTypes.INSERT,
                    }
                );
            }

            album = await sequelize.query("", {
                replacements: [album[0]],
                type: QueryTypes.SELECT,
            });

            for (let i = 0; i < album.length; i++) {
                const id = album[i].id;
                await sequelize.query(
                    "INSERT INTO `Contiene-Instrumentales`(`idalbum`, `idinstrumental`, `createdAt`, `updatedAt`) VALUES (?,?,?,?)", {
                        replacements: [album[0], instrumental, new Date(), new Date()],
                        type: QueryTypes.SELECT,
                    }
                );
            }
        } else {
            res.status(204).send();
        }
    }
};

module.exports = controlador;