'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilesWav extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FilesWav.init({
    fileid: DataTypes.INTEGER,
    instrumentalid: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'FilesWav',
  });
  return FilesWav;
};