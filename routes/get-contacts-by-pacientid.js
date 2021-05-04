const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { pacientid } } = req

    try {
        logic.getContactsByPacientId(pacientid)
            .then(contacts => {
                res.json(contacts)
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