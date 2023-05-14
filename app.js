const expres = require('express');
const app = expres();

// use error controller

app.use(require("./middlewares/errorController"));

module.exports =app;
