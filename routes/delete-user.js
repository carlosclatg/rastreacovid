const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { userid } } = req
    try {
        logic.deleteUser(userid)
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