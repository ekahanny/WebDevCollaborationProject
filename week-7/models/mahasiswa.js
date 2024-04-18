'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require('../config/db')

const MahasiswaModel = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mahasiswa.init({
    nim: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
}

module.exports = MahasiswaModel(db, DataTypes);