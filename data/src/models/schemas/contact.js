const { Schema } = require('mongoose')

const Contact = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    phone :  {
        type: Number,
        required: true
    }

    // pacientId: {
    //     type: String,
    //     required: true
    // }

})

module.exports = Contact