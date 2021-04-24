const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Carritos extends Model {}
Carritos - Instrumentales.init({
    idcompra: DataTypes.INTEGER,
    idinstrumental: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Carritos-Instrumentales',
});

module.exports = Carritos;