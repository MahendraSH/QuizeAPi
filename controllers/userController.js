const userModels = require("../models/userModels");
const CatchAsycErrors = require("../middleware/CatchAsyncError");

const sendTokenCooki = require("../utils/sendTokenCooki.js");
const ErrorHandler = require("../utils/ErrorHandler");


// auth user conrollers 
//  registor users 
const registor = CatchAsycErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await userModels.create({
        name,
        email,
        password,

    });
    sendTokenCooki(user, 200, res);
});

// login user 
const login = CatchAsycErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400));
    }
    const user = await userModels.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("password is incorrect", 401));
    }
    sendTokenCooki(user, 200, res);
});

//  logout user 
const logout = CatchAsycErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "logged out"
    })
});


//  admin
// get all users 
const getAllUsers = CatchAsycErrors(async (req, res, next) => {
    const users = await userModels.find();
    res.status(200).json({
        success: true,
        users,
    });
}

);

// admin 
// get user by id 

const getUserById = CatchAsycErrors(async (req, res, next) => {
    const user = await userModels.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// user role 

const updateUserRole = CatchAsycErrors(async (req, res, next) => {

    if (!req.body.role) {
        return next(new ErrorHandler("please enter role", 400));
    }
    const user = await userModels.findByIdAndUpdate(req.params.id, {
        role: req.body.role,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }
    res.status(200).json({
        success: true,
        user,
    });
});


module.exports = {
     registor,
     login,
     logout ,
     getAllUsers,
     getUserById, 
     updateUserRole,
    };