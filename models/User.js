const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    // _id: String,
    // email: String,
    link: String
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    urls: [UrlSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;