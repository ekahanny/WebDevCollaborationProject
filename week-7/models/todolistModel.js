const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db')

const ToDoList = db.define(
    'todolist',
    {
        nama_tugas: {
            type: DataTypes.STRING,
        },
        deskripsi: {
            type: DataTypes.STRING,
        },
        deadline: {
            type: DataTypes.DATEONLY,
        },
        status: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true
    }
)

module.exports = ToDoList