const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Files extends Model {};
Files.init({
    user: { type: DataTypes.INTEGER },
    tipe: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    meta: { type: DataTypes.JSON }
}, { sequelize, modelName: 'Files' });

module.exports = Files;