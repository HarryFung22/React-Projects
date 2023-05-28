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

//auto parse json from client
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Test")
})

app.get("/books",(req, res) => {
    // * used for ALL, books is table name
    const q = "SELECT * FROM bookreview.books"
    db.query(q, (err, data) => {//res as error or retrieves data
        if(err){
            return res.json(err)
        }
        return res.json(data)
        
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]
    db.query(q,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created")
    })
})

app.listen(port, () => {
    console.log("Connection to server Sucessfull")
})