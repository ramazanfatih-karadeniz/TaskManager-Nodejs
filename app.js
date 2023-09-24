const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config({ path: './config.env' });
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


//middleware
app.use(express.static('./public'));
app.use(express.json());


const taskRouter = require('./routes/tasks');

app.use('/api/v1/tasks', taskRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();

