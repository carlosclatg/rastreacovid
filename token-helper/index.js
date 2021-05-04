'use strict'

const jwt = require('jsonwebtoken')

const tokenHelper = {
    jwtSecret: null,

    createToken (userId)  {
        return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: '4h' })
    },

    verifyToken (token)  {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) throw Error(`subject not present in token ${token}`)

        return sub
    },

    tokenVerifierMiddleware  (req, res, next)  { //Attach userId to req
        const { headers: { authorization } } = req

        try {
            if(!authorization) throw new Error('Missing authorization')
            const token = authorization.substring(7) //Bearer |-> taken token from here
            
            const userId = this.verifyToken(token)
            //añadir logs
            req.userId = userId
        } catch ({ message }) {
            return res.status(400).json({ error: message })
        }

        next()
    }
}

const { createToken, verifyToken, tokenVerifierMiddleware } = tokenHelper

// Crear una nueva función con 'this' asociado al objeto original tokenhelper para poder acceder al jwt
tokenHelper.createToken = createToken.bind(tokenHelper)
tokenHelper.verifyToken = verifyToken.bind(tokenHelper)
tokenHelper.tokenVerifierMiddleware = tokenVerifierMiddleware.bind(tokenHelper)

module.exports = tokenHelper

