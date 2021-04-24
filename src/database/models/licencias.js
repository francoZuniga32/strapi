const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Licencia extends Model {}
Licencias.init({
    descripcion: DataTypes.STRING,
    archivo: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Licencias',
});

module.exports = Licencia;