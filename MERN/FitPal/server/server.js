const express = require('express')

const app = express()
const port = process.env.PORT || 4000

const workoutRoutes = require('./routes/workouts')

require('dotenv').config()

//middleware
app.use((req, res, next) => {
    console.log(res.path, req.method)
    next()
})

//parse req body to json
app.use(express.json())

//grabs all routes from diffent routers
app.use('/api/workouts', workoutRoutes)

app.listen(port, () => {
    console.log('Listening on port 4000')
})