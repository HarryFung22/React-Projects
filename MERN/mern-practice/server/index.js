const express = require("express"); //this is the equivalent to importing express but this is an older way to do so
const app = express(); //access all imports from the express library (creating routes, telling API to start, etc)
const mongoose = require('mongoose'); //importing mongoose library
const UserModel = require('./models/Users'); //importing the user model

const cors = require('cors'); //essentially this allows us to connect this api with the frontend

//express will automatically parse the json files
app.use(express.json());
app.use(cors());

require('dotenv').config();

//setting up connection to mongo database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri); //takes in a string that represents a connection to the cluster on mongodb atlas 

//creating two api requests, serves as "bridges" that relay info when requested from the frontend
app.get("/getUsers", (req, res) =>{
    UserModel.find({}, (err, result) => { //callback function returns arguments, first is any errors that occured and the second is the results from the query
        if(err){
            res.json(err);
        }else{ //if no error, send back results to frontend
            res.json(result); //parses data into json format, sends back to frontend
        }
    }); //adding an empty object as a parameter will send back all the data inside of the collection
}); //route as a parameter, as well as a request and response (req is the request from the frontend, res is relay this info back to the frontend)


//creating post request
//in order to save new information, we need to make this function asyncronous
app.post("/createUser", async (req, res) => {
    const user = req.body; //represents the data we want to insert into the database
    const newUser = new UserModel(user);
    await newUser.save();

    //sending back new user we created to the frontend
    res.json(user);
});

app.delete("/delete/:id", function(req, res) {
    const id = req.params.id;
    ChoiceModel.findOneAndRemove({_id: id}, function(err) {
        if(err){
            consolg.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    })
});


//starting the api, inputting a port number where the server will be located
//second parameter is a callback function that runs when the server is started/running
//can test this by running in the terminal "node index.js" (make sure you are in the server file first)
//purpose of nodemon is so that anytime there have been changes to the file, the server will automatically restart and update with those changes (saving the file restarts the server)
app.listen(3001, () => {
    console.log("Server is working");
});