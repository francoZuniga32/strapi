const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Compras extends Model {}

Compras.init({
    pymentid: DataTypes.STRING,
    tipo: DataTypes.STRING,
    external_reference: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
    },
    status: DataTypes.STRING,
    usuario: DataTypes.INTEGER,
    vendedor: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Compras",
});

module.exports = Compras;