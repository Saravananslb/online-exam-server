const express = require('express');
const { addQuestion, getQuestion, searchAnswers, addAnswers } = require('../Controller/questions.controller');
const { isAuthenticated, isAdminAuthenticated }  = require('../Middleware/auth.middleware');
const router = express.Router();

router.post('/questions', isAdminAuthenticated,  addQuestion);
router.get('/results', isAuthenticated, searchAnswers);
router.get('/questions', isAuthenticated, getQuestion);
router.post('/answer', isAuthenticated, addAnswers);

module.exports = router;