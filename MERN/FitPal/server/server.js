const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000
const uri = process.env.ATLAS_URI

const workoutRoutes = require('./routes/workouts')

//parse req body to json
app.use(express.json())

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
app.use('/api/workouts', workoutRoutes)
