const {Sequelize} = require('sequelize');
const connection = require('../database');


const Question = connection.define('question', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
       type: Sequelize.STRING,
       allowNull: false
   },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {
    console.log('Question table created.');
}).catch(err => {
    console.log('Error when tried to create a question table', err);
});

module.exports = Question;