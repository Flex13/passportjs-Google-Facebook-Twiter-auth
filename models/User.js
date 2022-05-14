const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    provider: {
        type: String,
        default: 'local'
    },
    image: {
        type: String
    },
    googleid: {
        type: String
    },
    facebookid: {
        type: String
    },
    twitterid: {
        type: String
    }
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;