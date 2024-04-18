'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const db = require('../config/db')

const ToDoListModel = (sequelize, DataTypes) => {
  class ToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToDoList.init({
    nama_tugas: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    deadline: DataTypes.DATEONLY,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDoList',
  });
  return ToDoList;
};

module.exports = ToDoListModel(db, DataTypes)