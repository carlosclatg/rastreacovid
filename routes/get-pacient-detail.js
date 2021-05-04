const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { pacientid }, query: { lang } } = req

    try {
        logic.getPacientDetail(pacientid, lang)
            .then(pacient => {
                res.json(pacient)
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