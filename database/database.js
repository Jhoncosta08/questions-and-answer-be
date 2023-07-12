const {Sequelize} = require("sequelize");
const connection = new Sequelize('questiondb', 'root', '5897', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;