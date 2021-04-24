const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Albumes extends Model {}
Albumes.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.REAL,
    categoria: DataTypes.STRING,
    minuatura: DataTypes.STRING,
    sample: DataTypes.STRING,
    vendedor: DataTypes.INTEGER,
    licencia: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Albumes',
});

module.exports = Albumes;