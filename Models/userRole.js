const mongoose = require('mongoose');

const userRole = mongoose.Schema({
    roleID: {
        type: Number,
        required: true,
    },
    roleName: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("userRole", userRole);