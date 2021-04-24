const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Compras extends Model {}

Compras.init({
    pymentid: DataTypes.STRING,
    external_reference: DataTypes.STRING,
    status: DataTypes.STRING,
    usuario: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Compras',
});

module.exports = Compras;