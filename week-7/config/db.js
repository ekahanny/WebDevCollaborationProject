const { Sequelize } = require('sequelize')

const db = new Sequelize('kelompok_4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db