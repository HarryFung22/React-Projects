//importing express router since this is a route that we are creating
const router = require('express').Router();

//importing the mongoose User model that we created
let User = require('../models/user.model');

//first endpoint that handles incoming http get requests on the /users url path
router.route('/').get((req, res) => {
    // .find() is a mongoose method that will give a list of all users form the mongodb database
    // this returns a promise, thus the results are returned in json format
    // res.json is the json file we are returning, and users is that file

    // if any errors occur, this flags a 400 error and sends back the error to the console
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

//second endpoint that handles incomming http post requests on the /users url path
router.route('/add').post((req, res) => {
    //new username is part of the request body, thus we assign it to the username variable
    const username = req.body.username;

    //this creates a new instance of a user, with its respective inputted name
    const newUser = new User({username});

    //the .save() method will save this info to the database
    newUser.save().then(() => res.json('User added!')).catch(err => res.status(400).json('Error: ' + err));
});

//exporting the router
module.exports = router;