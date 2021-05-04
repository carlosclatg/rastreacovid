const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { pacientid } } = req

    try {
        logic.deletePacient(pacientid)
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