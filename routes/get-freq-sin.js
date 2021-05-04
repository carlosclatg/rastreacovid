const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { lang }} = req
    try {
        logic.getFrequencySintoms(lang)
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