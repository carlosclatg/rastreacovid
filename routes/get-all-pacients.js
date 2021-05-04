const logic = require('../logic')

module.exports = (req, res) => {
    
    try {
        logic.getAllPacients()
            .then(pacients => {
                res.json(pacients)
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