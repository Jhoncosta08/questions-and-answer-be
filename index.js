const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
const connection = require('./database/database');
const QuestionModel = require('./database/db-models/question');
const AnswerModel = require('./database/db-models/answer');
const crypto = require('crypto');
app.use(express.urlencoded({extended: true}));
app.use(express.json());


connection.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => console.error('Error in database connection', err));


app.get('/', (req, res) => res.send('Question and answered app is running...'));


//START QUESTIONS ROUTES
app.post('/saveQuestion', (req, res) => {
    const reqBody = req.body;
    const id = crypto.randomUUID();
    QuestionModel.create({
        id: id,
        title: reqBody.title,
        description: reqBody.description
    }).then(response => {
        res.json(response);
    }).catch(err => console.error('Error when tried to save a question in database', err));
});


app.get('/getAllQuestions', (req, res) => {
    QuestionModel.findAll({raw: true, order: [['createdAt', 'DESC']]}).then(questions => {
        res.json(questions);
    }).catch(err => console.error('Error when tried to get all questions', err));
});


app.get('/getQuestionById/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        let allQuestionAnswer = [];
        AnswerModel.findAll({raw: true, order: [['createdAt', 'DESC']], where: {questionId: id}}).then(answers => {
            allQuestionAnswer = answers;
        }).catch(err => console.error('Error when tried to get all answer by question id', err));

        QuestionModel.findByPk(id).then(question => {
            res.json({question: question, answers: allQuestionAnswer});
        }).catch(err => console.error('Error when tried to get question by id', err));
    }
});
//END QUESTIONS ROUTES


//START ANSWER ROUTES
app.post('/saveAnswer', (req, res) => {
    const reqBody = req.body;
    const id = crypto.randomUUID();
    AnswerModel.create({
        id: id,
        questionId: reqBody.questionId,
        description: reqBody.description
    }).then(response => {
        res.json(response);
    }).catch(err => console.error('Error when tried to save an answer in database', err));
});

//END ANSWER ROUTES


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
