const mongoose = require('mongoose');

const feedback = mongoose.Schema({
    feedbackID: {
        type: Number,
        required: true
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required: 'true'
    },
    description: {
        type: String,
        required: 'true'
    },
})

module.exports = mongoose.model("Feedback", feedback);