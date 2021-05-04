const mongoose = require('mongoose')
const  User  = require('./src/models/schemas/user.js')
const  Logs  = require('./src/models/schemas/logs.js')
const  Permissions  = require('./src/models/schemas/permissions.js')
const Pacient = require ('./src/models/schemas/pacient.js')
const Contact = require ('./src/models/schemas/contact.js')
const Sintoms = require('./src/models/schemas/sintoms.js')

module.exports = {
    User: mongoose.model('User', User),
    Logs: mongoose.model('Logs', Logs),
    Permissions: mongoose.model('Permissions', Permissions),
    Pacient: mongoose.model('Pacient', Pacient),
    Contact: mongoose.model('Contact', Contact),
    Sintoms: mongoose.model('Sintoms', Sintoms)
}