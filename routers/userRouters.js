const { registor,getAllUsers,getUserById } = require('../controllers/userController');

const router = require('express').Router();

// user routes  for auth
// register user 
router.route('/register').post(registor);


//  admin routers 
// get all users
router.route('/all').get(getAllUsers);

// get user by id
router.route('/:id').get(getUserById);


module.exports = router;
