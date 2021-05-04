const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { lang }} = req
    try {
        logic.getSintoms(lang)
            .then(sintoms => {
                res.json(sintoms)
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