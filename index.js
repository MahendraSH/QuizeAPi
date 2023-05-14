const app = require('./app');
const dotenv = require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDB');

const port = process.env.PORT || 3000;

dbConnect();
const server = app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
