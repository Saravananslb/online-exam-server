const { getQuestions, addQuestions, getResults, postAnswer } = require('../Service/questions.service');

const getQuestion = async(req, res) => {
    try {
        const examId = req.query.examId;
        const userId = res.locals.userId;
        const questions = await getQuestions(examId, userId);
        res.json({ status: true, questions});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const searchAnswers = async(req, res) => {
    try {
        const { examId } = req.query;
        const userId = res.locals.userId;
        const answers = await getResults(examId, userId);
        res.json({ status: true, answers});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const addQuestion = async(req, res) => {
    try {
        const exam = req.body.exam;
        const questions = req.body.questions;
        const userId = res.locals.userId;
        const result = await addQuestions(exam, questions, userId);
        res.json({ status: true, questions: result });
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const addAnswers = async(req, res) => {
    try {
        const exam = req.body.exams;
        const examId = req.body.examId;
        const userId = res.locals.userId;
        const answers = await postAnswer(examId, exam, userId);
        res.json({ status: true, answers});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

module.exports = {
    addQuestion,
    getQuestion,
    addAnswers,
    searchAnswers
}