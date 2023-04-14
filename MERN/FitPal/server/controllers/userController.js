const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET

const createToken = (_id) => {
     return jwt.sign({_id}, secretKey, {expiresIn: '3d'})
}

//login
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.signup(email, password)

        //generate a token to pass to client
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    loginUser,
    signupUser
}