const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
const connection = require('./database/database');
const QuestionModel = require('./database/db-models/question');
const crypto = require('crypto');

connection.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error('Error in database connection', err);
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Question and answered app is running...');
})


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

})


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
