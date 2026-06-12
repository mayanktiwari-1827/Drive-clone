const mongoose = require("mongoose");

const fileschema = new mongoose.Schema({
    path:{
        type: String,
        required: [true, "path is required"]
    },
    originalname:{
        type: String,
        required: [true, "original name is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user is required"]
    }
})

// here im user in type tht line makes sure ki user me value as a id aaye and jiska referrence wo "users" naam k collection se lega jo ki database me hai

const File = mongoose.model("file", fileschema);

module.exports = File;