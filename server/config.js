require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('auth_db', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
