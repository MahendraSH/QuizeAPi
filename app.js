const expres = require('express');
const app = expres();

app.use(expres.json());
app.use(expres.urlencoded({extended:true}));

// use routes
app.use('/api/user', require("./routers/userRouters"));

// use error controller

app.use(require("./middleware/ErrorController"));


module.exports =app;
