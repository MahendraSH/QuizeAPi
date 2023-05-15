const app = require('./app');
const moment = require('moment');
// const dotenv = require('dotenv').config({ path: './config/.env' });

dotenv.config({ path: './.env' });
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




const job = new CronJob(' * * * * *', async function () {

    const quizs = await quizModels.find();
    if (quizs.length > 0) {

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        quizs.forEach(async (quiz) => {


            if (moment(currentDateTime).isBetween(quiz.startDate, quiz.endDate, null, '[]')) {
                quiz.status = 'active';
                await quiz.save();
            }
            if (moment(currentDateTime).isAfter(quiz.endDate)) {
                quiz.status = 'finished';
                await quiz.save();
            }
            if (moment(currentDateTime).isAfter(moment(quiz.endDate).add(5, "minutes"))) {
                quiz.status = 'result';
                await quiz.save();
            }

            console.log(quiz.title);
            console.log(moment(quiz.endDate).add(5, "minutes").format('YYYY-MM-DD HH:mm:ss'));
        }


        );
    }
    // console.log(moment().format('Do MMMM YYYY hh:mm:ss'));
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