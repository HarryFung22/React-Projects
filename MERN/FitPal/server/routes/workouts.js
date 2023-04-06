const express = require('express')
const router = express.Router()

//returns all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'get all workouts'})
})

//returns single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'get specific workout'})
})

//create new workout
router.post('/', (req, res) => {
    res.json({mssg: 'post new workout'})
})

//delete workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a workout'})
})

//update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a workout'})
})



module.exports = router