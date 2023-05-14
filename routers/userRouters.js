const { registor, getAllUsers, getUserById } = require('../controllers/userController');
const { isAuthenticatedUser, autherizedRoles } =require('../middleware/auth');
const router = require('express').Router();

// user routes  for auth
// register user 
router.route('/register').post(registor);


//  admin routers 
// get all users

router.route('/all').get(isAuthenticatedUser,getAllUsers);

// get user by id
router.route('/:id').get(getUserById);


module.exports = router;
