const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm, type, phone } } = req
    try {
        logic.updateUser(name, surname, email, password, passwordConfirm, type, phone)
            .then(id => res.json({ id }))
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