const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class CarritosAlbumes extends Model {}
CarritosAlbumes.init({
    idcompra: DataTypes.INTEGER,
    idalbum: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Carritos-Albumes',
});

module.exports = CarritosAlbumes;