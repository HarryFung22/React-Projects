const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000
const uri = process.env.ATLAS_URI
const api = process.env.API

const workoutRoutes = require('./routes/workouts')

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

//middleware
app.use((req, res, next) => {
    console.log(res.path, req.method)
    next()
})

//grabs all routes from diffent routers
app.use(api, workoutRoutes)
