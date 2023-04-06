const express = require('express')
const router = express.Router()

//import controllers, dereference object to get individual functions for each CRUD operation
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

//returns all workouts
router.get('/', getWorkouts)

//returns single workout
router.get('/:id', getWorkout)

//create new workout
router.post('/', createWorkout)

//delete workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)


module.exports = router