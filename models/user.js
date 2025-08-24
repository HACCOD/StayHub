const { string, required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    googleId:{
        type: String,
    }
})
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);