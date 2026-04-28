const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
});

module.exports = mongoose.model("User", UserSchema);