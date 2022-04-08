const express = require('express');
const authRouter = require('./auth.route');
const examRouter = require('./questions.route');

const app = express();

app.use('/auth', authRouter);
app.use('/exams', examRouter);

module.exports = app;