const Sequelize = require('sequelize');
const db = require('../util/database');

const Stock = db.define('stock', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    symbol: Sequelize.STRING,
    price: Sequelize.FLOAT,
    shortName: Sequelize.STRING,
    longName: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    timestamp: Sequelize.DATE,
    date: Sequelize.DATEONLY,
});

module.exports = Stock;