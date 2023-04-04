const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    //only has a single field for username, with validations
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trims white space off the end (if someone types spaces at the end, it will trim off)
        minlength: 3
    }, 
}, {
    //this automatically creates fields for when the user was created, modified, etc
    timestamps: true,
});

const User = mongoose.model('User', userSchema); // 'User' is an ambiguous name, it can be anything but we will refer to user for simplicity

module.exports = User;