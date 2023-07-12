const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
const connection = require('./database/database');


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
    console.log('saveQuestion body: ', reqBody);
    res.json({questionId: '014bf826-20e3-11ee-be56-0242ac120002'});
})


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
