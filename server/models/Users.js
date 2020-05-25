const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: String,
    name: String,
    room: String
});

module.exports = mongoose.model('Users', userSchema);