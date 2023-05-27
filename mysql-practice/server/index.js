const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000
const pass = process.env.PASS

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: pass,
    database: "bookreview"
})

//enable REST API between client and server
app.use(cors())

app.listen(port, () => {
    console.log("Connection to server Sucessfull")
})