const {Sequelize} = require('sequelize');
const connection = require('../database');

const Answer = connection.define('answer', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
    },
    questionId: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {
    console.log('Answer table created.');
}).catch(err => {
    console.log('Error when tried to create a answer table', err);
});

module.exports = Answer;