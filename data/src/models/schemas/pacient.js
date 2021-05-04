const { Schema, ObjectId } = require('mongoose')


const Pacient = new Schema({
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
        required: true,
        unique: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    PCRDate: {
        type: Date,
        required: true
    },

    contacts: {
        type: [ObjectId]
    },

    sintoms: {
        type: [ObjectId]
    },

    createdBy: {
        type: ObjectId,
        required: true
    }

})



module.exports = Pacient