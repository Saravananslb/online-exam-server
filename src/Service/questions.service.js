const questionsSchema = require("../Models/questions.model");
const answerSchema = require("../Models/answer.model");
const { endOfDay, startOfDay } = require("date-fns");

const addQuestions = async (exam, questions, userId) => {
  const formatedQuestions = new questionsSchema({
    ...exam,
    createdBy: userId,
    questions: questions,
  });
  const createdQuestions = await formatedQuestions.save();

  return createdQuestions._doc;
};

const postAnswer = async (examId, exam, userId) => {
  let points = 0;
  const _qstns = [];
  const questions = await questionsSchema.findById(examId);
  console.log(examId, exam, userId)
  questions.questions.map((item) => {
    exam.questions.map((_item) => {
      if (item.id === _item.id) {
        if (item.answers.sort().join("") === _item.answers.sort().join("")) {
          points++;
          _item.isCorrect = true;
        } else {
          _item.isCorrect = false;
        }
        _qstns.push(_item)
      }
      return _item;
    });
  });
  const answers = new answerSchema({
    questions: _qstns,
    createdBy: userId,
    points,
    examId,
  });
  const createdAnswers = await answers.save();

  return createdAnswers._doc;
};

const getQuestions = async (examId, userId) => {
  let questions;
  if (examId) {
    questions = await questionsSchema.findById(examId);
    let qst = JSON.parse(JSON.stringify(questions.questions));
    const newQst = qst.map((item) => {
      item.answers = [];
      return item
    });
    delete questions._doc.question
    return { ...questions._doc, questions: newQst };
  } else {
    questions = await questionsSchema.find();
    let qst = JSON.parse(JSON.stringify(questions));
    const answers = await answerSchema.find({ createdBy: userId});
    const newqst = qst.map(item => {
        answers.map(_item => {
            if (_item.examId === item._id) {
                item.isCompleted = true;
            }
        })
        return item;
    })
    return newqst
  }
};

const getResults = async (examId, userId) => {
  const answers = await answerSchema.find({ createdBy: userId, examId});
  return answers;
};

module.exports = {
  addQuestions,
  getQuestions,
  getResults,
  postAnswer,
};
