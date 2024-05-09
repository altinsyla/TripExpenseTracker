const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID : {
        type: Number,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registered_on: {
        type: Date,
        default: new Date(),
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, ref: 'userRole', // foreign key me userRole.js
        required: true,
    },
});


module.exports = mongoose.model("Users", userSchema);
