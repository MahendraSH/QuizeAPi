const { createQuiz,getAllQuiz, getActiveQuiz, getResultOfQuizByID } = require('../controllers/quizeController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router =require('express').Router();

router.route('/').post (isAuthenticatedUser,createQuiz);

router.route('/all').get (isAuthenticatedUser,getAllQuiz);

router.route('/active').get(isAuthenticatedUser,getActiveQuiz);

router.route('/:id').get (isAuthenticatedUser,getResultOfQuizByID);



module.exports = router;    