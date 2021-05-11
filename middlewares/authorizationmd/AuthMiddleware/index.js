const { User, Permissions } = require("../../../data")
const {AuthError, EmptyError} = require('../../../errors/index')

const {ADMIN, RASTREATOR} = require('../../../logic')

module.exports = function verifyAuth(operation) {
    return async (req, res, next) => {
        try{
            
            userId = req.userId
            const user = await User.findById(userId)
            if(!user){
                res.status(408); 
                throw new Error('Auth failed');
            } 
            const permissions = await Permissions.findOne({operation})

            console.log(permissions)
            if(!user.type)  {
                res.status(500); 
                throw new EmptyError()
            }

            if(user.type === ADMIN){
                if(!permissions.isAdminAllowed) {
                    throw new AuthError()
                }
            }

            if(user.type === RASTREATOR){
                if(!permissions.isRastreatorAllowed) {
                    throw new AuthError()
                } 
            }

            next()

        }catch(err){
            console.log(err)
            if(err instanceof AuthError){
                res.status(401).json({
                    error: "Not Authorized"
                })
            }

            if(err instanceof EmptyError){
                res.status(500).json({
                    error: "Not existing user"
                })
            }

            res.status(500).json({
                error: "Internal server error"
            })
        }
    };
};
