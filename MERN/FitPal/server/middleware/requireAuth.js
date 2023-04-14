const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    //check for authentication, check jwt
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error: 'Authorization token required'})
    }
    //split token (bearer + ..., only want ...)
    const token = authorization.split(' ')[1]

    //verify if token was not changed
    try{
        const{_id} = jwt.verify(token, process.env.SECRET)
        //assigning user property after middleware function runs for other functions to use in their req body (i.e. POST, DELETE, PATCH, etc)
        //only assigns the id to the request body, no other properties
        req.user = await User.findById({_id}).select('_id')

        //fires next handler function
        next()
    }catch(error){
        res.status(401).json({error: 'Unauthorized Request'})
    }
}

module.exports = requireAuth