const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");
const Instrumental = require("./instrumentales");

class Carritos_Instrumentales extends Model {}
Carritos_Instrumentales.init({
    idcompra: DataTypes.INTEGER,
    idinstrumental: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "Carritos-Instrumentales",
});

module.exports = Carritos_Instrumentales;