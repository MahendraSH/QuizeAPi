const expres = require('express');
const app = expres();

// use error controller
app.use(expres.json());
app.use(expres.urlencoded({extended:true}));

// use routes
app.use(require("./routers/userRouters"));
app.use(require("./middleware/ErrorController"));


module.exports =app;
