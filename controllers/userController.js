const userModels = require("../models/userModels");
const CatchAsycErrors =require("../middleware/CatchAsyncError");

const sendTokenCooki = require("../utils/sendTokenCooki.js");


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


module.exports ={registor,getAllUsers,getUserById};