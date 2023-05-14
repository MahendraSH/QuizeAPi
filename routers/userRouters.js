const {
    registor,
    login,
    logout,
    getAllUsers,
    getUserById,
    updateUserRole, } = require('../controllers/userController');
const { isAuthenticatedUser, autherizedRoles } = require('../middleware/auth');
const router = require('express').Router();

// user routes  for auth

// register user 
router.route('/register').post(registor);
// login user 
router.route('/login').post(login);
// logout user 
router.route('/logout').get(isAuthenticatedUser, logout)




//  admin routers 

// get all users
router.route('/all').get(isAuthenticatedUser, autherizedRoles('admin'), getAllUsers);
// get user by id
router.route('/:id').get(isAuthenticatedUser, autherizedRoles('admin'), getUserById);
// update user role 
router.route('/role/:id').put(isAuthenticatedUser, autherizedRoles('admin'), updateUserRole);



module.exports = router;
