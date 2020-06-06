var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    _id: String
});

module.exports = mongoose.model('User', UserSchema);