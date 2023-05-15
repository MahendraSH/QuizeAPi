const app = require('./app');
const moment = require('moment');
const dotenv = require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDB');
const quizModels = require('./models/quizModels');
const CronJob = require('cron').CronJob;

//  handling uncaught exception

process.on('uncaughtException', (err) => {

    err.message = err.message || "Internal Server Error";
    console.log(err);
    console.log(" uncaughtException error sever shutdowing ------......");

    process.exit(1);

});




const job = new CronJob(' * * * * *',  async function () {

    const quizs =   await quizModels.find();
    if (quizs.length > 0) {

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        quizs.forEach(async (quiz) => {
            // if (moment(currentDateTime).isBetween(startTime, endTime, null, '[]')) {
            //     // Quiz is currently running
            //     // Update the status of the quiz to 'running'
            //     console.log(`Updating status for ${quiz.name}: Running`);
            // } else if (moment(currentDateTime).isAfter(endTime)) {
            //     // Quiz has ended
            //     // Update the status of the quiz to 'ended'
            //     console.log(`Updating status for ${quiz.name}: Ended`);
            // } else {
            //     // Quiz has not started yet
            //     // Update the status of the quiz to 'upcoming'
            //     console.log(`Updating status for ${quiz.name}: Upcoming`);
            // }

            if (moment(currentDateTime).isBetween(quiz.startDate, quiz.endDate, null, '[]')) {
                quiz.status = 'active';
               await quiz.save();
            }
            if (moment(currentDateTime).isAfter(quiz.endDate)) {
                quiz.status = 'finished';
                await quiz.save();
            }
            if (moment(new Date(quiz.endDate +  (5 * 60 * 1000))).isBefore(currentDateTime)){
                quiz.status ='result';
                console.log(quiz.title);
                await quiz.save();
            }
        }

        );
    }
    console.log(moment().format('Do MMMM YYYY hh:mm:ss'));
});
job.start();


const port = process.env.PORT || 3000;

dbConnect();
const server = app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


process.on('unhandledRejection', (err) => {

    err.message = err.message || "Internal Server Error";
    console.log(err);
    console.log(" unhandledRejection error sever shutdowing ------......");
    server.close(() => {
        process.exit(1);
    });
});