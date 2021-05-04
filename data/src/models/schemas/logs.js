const { Schema } = require('mongoose')

const Logs = new Schema({
    userId: {
        type: String,
        required: true
    },
    
    operation: {
        type: String,
        required: true
    },

    date: { 
        type: Date, 
        default: Date.now ,
        required: false
    }
})

module.exports = Logs