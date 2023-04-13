const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method (cannot use arrow function in order to use the this keyword)
userSchema.statics.signup = async function (email, password){
    //check if field exists
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    //email validation + pass strength (premade functions from validator library)
    if(!validator.isEmail(email)){
        throw Error('Not a valid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Choose a Stronger Password')
    }


    //checking if email already exists
    const verify = await this.findOne({email})
    if(verify){
        throw Error('Email already in use')
    }
    //salt used to add to user's password before hashing into database, param determines strength of salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user

}

userSchema.statics.login = async function (email, password){
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect Email. Try again')
    }

    //verify if pass matches (bcrypt handles the decryption of pass in db to compare vs inputed plain text pass)
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect Password. Try again')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)