const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('emails',
    'postgres', 'sammy1234', {
    host: 'localhost',
        dialect: 'postgres',
    });

module.exports = sequelize;