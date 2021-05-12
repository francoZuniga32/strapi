'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilesMp3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FilesMp3.init({
    fileid: DataTypes.INTEGER,
    instrumentalid: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'FilesMp3',
  });
  return FilesMp3;
};