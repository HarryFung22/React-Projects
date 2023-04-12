const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000
const uri = process.env.ATLAS_URI
const workoutAPI = process.env.API_WORKOUT
const userAPI = process.env.API_USER

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//parse req body to json
app.use(express.json());
//allow API calls between front-end and back-end (both located on different servers)
app.use(cors());

mongoose.connect(uri)
.then(() => {
    app.listen(port, () => {
        console.log(`Connection to MongoDB successful. Listening on port: ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})

//grabs all routes from diffent routers (both workouts and users)
app.use(workoutAPI, workoutRoutes)
app.use(userAPI, userRoutes)
