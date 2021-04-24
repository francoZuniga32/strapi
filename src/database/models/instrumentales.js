const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');
const Files = require('./files');

class Instrumentales extends Model {}
Instrumentales.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.REAL,
    categoria: DataTypes.STRING,
    minuatura: {
        type: DataTypes.INTEGER,
        references: {
            model: Files,
            key: 'id'
        }
    },
    bpm: DataTypes.INTEGER,
    escala: DataTypes.STRING,
    mp3: {
        type: DataTypes.INTEGER,
        references: {
            model: Files,
            key: 'id'
        }
    },
    wav: {
        type: DataTypes.INTEGER,
        references: {
            model: Files,
            key: 'id'
        }
    },
    sample: {
        type: DataTypes.INTEGER,
        references: {
            model: Files,
            key: 'id'
        }
    },
    vendedor: DataTypes.INTEGER,
    licencia: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Instrumentales',
});

module.exports = Instrumentales;