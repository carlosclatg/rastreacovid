const logic = require('../logic')

const { createToken } = require('../token-helper')

module.exports = (req, res) => {

    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            // .then(data => res.json(data))
            .then(user => {
                const token = createToken(user.id)

                res.json({ token, 'type': user.type })
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