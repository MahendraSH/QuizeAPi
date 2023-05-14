const app = require('./app');
const dotenv = require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDB');


//  handling uncaught exception

process.on('uncaughtException', (err) => {
    err.statusCode = 500;
    err.message = err.message || "Internal Server Error";
    next(err);
    console.log(" uncaughtException error sever shutdowing ------......");

    process.exit(1);

});

const port = process.env.PORT || 3000;

dbConnect();
const server = app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


process.on('unhandledRejection', (err) => {
    err.statusCode = 500;
    err.message = err.message || "Internal Server Error";
    next(err);
    console.log(" unhandledRejection error sever shutdowing ------......");
    server.close(() => {
        process.exit(1);
    });
});