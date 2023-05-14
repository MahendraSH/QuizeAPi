const moongoose = require('mongoose');

const quizSchema = new moongoose.Schema({
    title: {
        type: String,
        required: [true, 'A quiz must have a title'],
    },
    Questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        rightAnswer: {
            type: String,
            required: true
        },

    },],

    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {

        type: Date,
        required: true
    },

    inactive: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    }
});

module.exports = moongoose.model('Quiz', quizSchema);




