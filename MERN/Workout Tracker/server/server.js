//these are all the imports we need for the server
//essentially just the "import .. from ..." but this is an older way to do it
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //this is what helps us connect to the mongodb database

require('dotenv').config(); //configuring so that our environment variables are in the dotenv file

//creating express server
const app = express();
const port = process.env.PORT || 5000;

//middleware, 
app.use(cors());
app.use(express.json()); //allows use to parse json files, server will be sending and receiving json files

//getting database uri
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//importing files for the exercise and user routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//anytime anyone goes to these respective routes (/users or /exercises),
//it will bring them to the coresponding routes/pages
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Server is running on port: 5000');
});