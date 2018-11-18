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
    }

});

mongoose.model('message', MessageSchema);