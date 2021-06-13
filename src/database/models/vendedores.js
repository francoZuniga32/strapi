const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Vendedores extends Model {}
Vendedores.init({
    idusuario: DataTypes.INTEGER,
    banner: DataTypes.STRING,
    mercadopago: DataTypes.JSON,
}, {
    sequelize,
    modelName: "Vendedores",
});

module.exports = Vendedores;