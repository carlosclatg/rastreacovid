const logic = require('../logic')

module.exports = (req, res) => {

    try {
        logic.getStats()
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