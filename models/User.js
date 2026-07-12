const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        minlength:3,
        maxlength:30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;