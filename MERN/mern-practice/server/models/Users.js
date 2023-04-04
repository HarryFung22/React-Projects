const mongoose = require('mongoose')

//creating an object inside of the schema, information that should be stored about the user
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

//this model function takes in two parameters: Name of the collection/model, and the schema that represents that model
const UserModel =  mongoose.model("users", UserSchema);

//exporting the model so that we have access to it outside of this file
module.exports = UserModel;