const { Schema } = require('mongoose')

const Permissions = new Schema({
    operation: {
        type: String,
        required: true
    },

    isAdminAllowed: {
        type: Boolean,
        required: true
    },

    isRastreatorAllowed: {
        type: Boolean,
        required: true
    }

})

module.exports = Permissions