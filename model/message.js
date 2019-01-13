const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({

    FirstName: {
        type: String,
        required: false
    },

    LastName: {
        type: String,
        required: false
    },

    Email: {
        type: String,
        required: true
    },

    Message: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now
    }

});

mongoose.model('message', MessageSchema);