const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class ContieneInstrumentales extends Model {}

ContieneInstrumentales.init({
    idalbum: DataTypes.INTEGER,
    idinstrumental: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Contiene-Instrumentales',
});

module.exports = ContieneInstrumentales;