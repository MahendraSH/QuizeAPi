const { registor, getAllUsers, getUserById, login, logout } = require('../controllers/userController');
const { isAuthenticatedUser, autherizedRoles } =require('../middleware/auth');
const router = require('express').Router();

// user routes  for auth
// register user 
router.route('/register').post(registor);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticatedUser,logout)


//  admin routers 
// get all users

router.route('/all').get(isAuthenticatedUser,getAllUsers);

// get user by id
router.route('/:id').get(getUserById);


module.exports = router;
