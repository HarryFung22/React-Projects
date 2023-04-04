const router = require('express').Router();

//importing the exercise model we created
let Exercise = require('../models/exercise.model');

//handles http get requests to get all exercises from the database, then returning them in json format
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handles http post requests to add new exercises to the database
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration); //this converts the duration to a number
  const date = Date.parse(req.body.date); // this converts to the date data type

  //creates a new exercise will info from the variables above
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  //returns the exercise in json format
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// the ":id" is like a variable, its an object id created automatically by mongodb
// the findById will return the corresponding exercise attached to that id in json
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//passing in the object id will find the corresponding exercise and deleting it from the database
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id).then(() => res.json('Exercise deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//find current exercise from id that was passed in
//in order to update an exercise, you must pass in all required fields
//you cannot just update one field and pass that in, it will result in an error
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => { // the variable exercise is that corresponding exercise found from the database
      //the '/update/:id' route needs to receive a json object that fulfils the exercise schema
      //essentially, req.body... takes in new information and assigns it to the fields of the exercise that already exists
      //then we save the exercise, and return as json 
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;