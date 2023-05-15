const expres = require('express');
const cookiParser = require('cookie-parser');

const app = expres();

app.use(expres.json());
app.use(expres.urlencoded({extended:true}));
app.use(cookiParser());

// use routes
app.use('/api/user', require("./routers/userRouters"));
app.use('/api',require("./routers/quizRouters"));

// use error controller

app.use(require("./middleware/ErrorController"));


module.exports =app;
