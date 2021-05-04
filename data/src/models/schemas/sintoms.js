const { Schema } = require('mongoose')

const Sintoms = new Schema({
    sintoma_cat: {
        type: String,
        required: true
    },

    sintoma_es: {
        type: String,
        required: true
    },

    sintoma_eng: {
        type: String,
        required: true
    }

})

module.exports = Sintoms