const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config();

//MIDDLEWARE
// app.use('/public',express.static('public'));
app.use(express.static('./public'));
app.use(express.json());

//ROUTES

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);


//LISTENING
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));
    }
    catch (error) {
        console.log('+++');
        console.log(error);
    }
}

start();