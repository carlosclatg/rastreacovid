const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, phone, birthDate, PCRDate, contacts, sintoms  }, userId} = req

    //registerPacient(name, surname, phone, bdate, PcrDate, arrayOfContacts, sintoms, userId)
    try {
        logic.registerPacient(name, surname, phone, birthDate, PCRDate, contacts, sintoms, userId)
            .then(pacient => {
                res.json({'id' : pacient})
            })
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
            
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}