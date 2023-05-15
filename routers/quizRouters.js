const { createQuiz } = require('../controllers/quizeController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router =require('express').Router();

router.route('/quizzes').post (isAuthenticatedUser,createQuiz);

module.exports = router;    