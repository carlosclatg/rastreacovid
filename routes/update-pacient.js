const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { pacientid }, body: { name, surname, phone, birthDate, PCRDate, contacts, sintoms  }, userId } = req

    try {
        logic.updatePacient(pacientid, name, surname, phone, birthDate, PCRDate, contacts, sintoms, userId)
            .then(result => {
                res.json(result)
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