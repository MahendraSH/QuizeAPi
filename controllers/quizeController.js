const ErrorHandler = require("../utils/ErrorHandler");
const quizModels = require("../models/quizModels");
const CatchAsycErrors = require("../middleware/CatchAsyncError");
const moment = require("moment")
const currentDateTime = new Date();

// create quiz

const createQuiz = CatchAsycErrors(async (req, res, next) => {
    const {
        title,
        Questions,
    } = req.body;

    let status = "inactive"
    let { startDate,
        endDate, } = req.body;

    if (!Questions || Questions.length === 0) {
        return next(new ErrorHandler("Questions :Please add at least one question", 400));
    }
    if (!startDate || !endDate) {
        return next(new ErrorHandler("please enter startDate and endDate ", 400));
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    console.log(startDate);

    console.log(moment(startDate).format('YYYY-MM-DD HH:mm:ss'));
    console.log(moment(endDate).format('YYYY-MM-DD HH:mm:ss'));
    console.log(endDate);
    if (moment(startDate).isAfter(endDate) || moment(endDate).isSame(startDate)) {
        return next(new ErrorHandler("StartDate should be less than EndDate", 400));
    }

    if (moment(currentDateTime).isBetween(startDate, endDate, null, '[]')) {
        status = "active"
        // console.log("active")
    }
    else if (moment(currentDateTime).isBefore(startDate, null, '[]')) {
        // status = "inactive"
        // console.log("inactive")
        // console.log(moment(currentDateTime).format('YYYY-MM-DD HH:mm:ss'))
    }
    else {
        return next(new ErrorHandler("start date and end date should be greater than current date", 400));

    }


    const quiz = await quizModels.create({

        title,
        Questions,
        startDate,
        endDate,
        user: req.user._id,
        status,
    });

    res.status(201).json({
        success: true,
        quiz,
    });
});

//get all quiz
const getAllQuiz = CatchAsycErrors(async (req, res, next) => {
    const quiz = await quizModels.find({}).populate("user", "name email");

    res.status(200).json({
        success: true,
        quiz,
    });
});

//  get all active quiz
const getActiveQuiz = CatchAsycErrors(async (req, res, next) => {
    const quiz = await quizModels.find({ status: "active" });
    res.status(200).json({
        
        success: true,
        
        success: true,
        quiz,
    });

});

// get result of quzic by id 

const getResultOfQuizByID = CatchAsycErrors(async (req, res, next) => {
    const quiz = await quizModels.findById(req.params.id).select('+Questions.rightAnswer');
    res.status(200).json({
        success: true,
        quiz,
    });
});




module.exports = { createQuiz,getAllQuiz,getActiveQuiz,getResultOfQuizByID  }