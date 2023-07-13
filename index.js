const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
const connection = require('./database/database');
const QuestionModel = require('./database/db-models/question');
const crypto = require('crypto');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


connection.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error('Error in database connection', err);
});


app.get('/', (req, res) => {
    res.send('Question and answered app is running...');
});


app.post('/saveQuestion', (req, res) => {
    const reqBody = req.body;
    const id = crypto.randomUUID();
    QuestionModel.create({
        id: id,
        title: reqBody.title,
        description: reqBody.description
    }).then(response => {
        console.log('question saved', response);
        res.json(response);
    }).catch(err => {
        console.error('Error when tried to save a question in database', err);
    });
});


app.get('/getAllQuestions', (req, res) => {
    QuestionModel.findAll({raw: true, order: [['createdAt', 'DESC']]}).then(questions => {
        res.json(questions);
    }).catch(err => {
        console.error('Error when tried to get all questions', err);
    })
});


app.get('/getQuestionById/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        QuestionModel.findByPk(id).then(question => {
            res.json(question);
        }).catch(err => {
            console.error('Error when tried to get question by id', err);
        });
    }
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
