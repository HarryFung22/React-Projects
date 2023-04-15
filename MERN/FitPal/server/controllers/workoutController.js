//handling database logic, creating functions that can be used to reference in routes
const mongoose = require('mongoose')
const Workout = require('../models/WorkoutModel.js')

//get all workouts
const getWorkouts = async (req, res) => {
    //grab user id to only fetch docs assigned to that user
    const user_id = req.user._id

    //leave object blank + specify id to only retrieve workouts created by that user, sort by descending order (-1)
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req, res) => {
    //destructure request, get id params
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    //if at least one field is empty, send that field error back to client
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try{
        //grabbing user id from middleware
        const user_id = req.user._id

        //assign every workout with the user id, only able to fetch workouts created by that user
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    //_id is property given to every workout from MongoDB
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    //pass two properties, id and updated body (title, load, reps)
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        //destructure properties from object to get updated info from each field
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}

//exporting each function as part of an object's properties
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}