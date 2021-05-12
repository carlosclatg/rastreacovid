'use strict'

const { User, Pacient, Contact, Sintoms } = require('../data/index')
const bcrypt = require('bcrypt');
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('../errors')
const passwordValidator = require('password-validator');
const mongoose = require('mongoose')
/**
 * Abstraction of business logic.
 */
const logic = {
    
    ADMIN : "admin",
    RASTREATOR : "rastreator",
    
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */

    //Tested 28-02 with Postman
    registerUser(name, surname, email, password, passwordConfirmation, type, phone) {
        if (typeof name !== 'string') throw new TypeError('name  is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')
        if (typeof surname !== 'string') throw new TypeError('surname is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')
        if (typeof email !== 'string') throw new TypeError('email is not a string')
        if (!email.trim().length) throw new EmptyError('email cannot be empty')
        if (typeof password !== 'string') throw new TypeError('password  is not a string')
        if (!password.trim().length) throw new EmptyError('password cannot be empty')
        if (typeof passwordConfirmation !== 'string') throw new TypeError('passwordConfirmation is not a string')
        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')
        if (typeof type !== 'string') throw new TypeError('type is not a string')
        if (!type.trim().length) throw new EmptyError('type cannot be empty')
        if (typeof phone !== 'number') throw new TypeError('phone is not a number')
        if (type !== this.ADMIN && type !== this.RASTREATOR) throw new TypeError('type is not a valid type')


        let schema1 = new passwordValidator();

        schema1
            .min(8)                                    // Minimum length 8
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits(1)  
        //check password security:
        if(!schema1.validate(password)) throw new TypeError(password + ' does not meet minimum security requirements. Min 8. Uppercase and lowercase and 1 number')  


        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new DuplicateError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, type , password: hash , phone})

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw new TypeError('email is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw new TypeError(' password is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return (async () => {
                const user = await User.findOne({ email }) 
                if(!user) throw new EmptyError('User not exists')        
                const match = await bcrypt.compare(password, user.password)
                if (!match) throw new AuthError('wrong credentials')
                
                return {'id': user.id, 'type': user.type}
        })()
    },

    /**
     * Retrieves a user by userId
     * 
     * @param {String} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw new TypeError(`userId is not a valid String`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findById(userId).select({"name": 1, "_id": 0, "surname": 1, "email": 1, "phone": 1})
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                return user
            })
    },

    /**
     * Updates user-related fields in DB.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirmation 
     */

    updateUser(name, surname, email, password, passwordConfirmation, type, phone){
        if (typeof name !== 'string') throw new TypeError('name  is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')
        if (typeof surname !== 'string') throw new TypeError('surname is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')
        if (typeof email !== 'string') throw new TypeError('email is not a string')
        if (!email.trim().length) throw new EmptyError('email cannot be empty')
        if (typeof password !== 'string') throw new TypeError('password  is not a string')
        if (!password.trim().length) throw new EmptyError('password cannot be empty')
        if (typeof passwordConfirmation !== 'string') throw new TypeError('passwordConfirmation is not a string')
        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')
        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')
        if (typeof type !== 'string') throw new TypeError('type is not a string')
        if (!type.trim().length) throw new EmptyError('type cannot be empty')
        if (typeof phone !== 'number') throw new TypeError('phone is not a number')
        if (type !== this.ADMIN && type !== this.RASTREATOR) throw new TypeError('type is not a valid type')


        let schema1 = new passwordValidator();

        schema1
            .min(8)                                    // Minimum length 8
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits(1)  
        //check password security:
        if(!schema1.validate(password)) throw new TypeError(password + ' does not meet minimum security requirements. Min 8. Uppercase and lowercase and 1 number')  

        return (async () => {
            const hash = await bcrypt.hash(password, 10)
            const user = await User.findOneAndUpdate({email}, {$set:{name, surname, 'password': hash}, type, phone}, {new : true})
            if(!user) throw new NotFoundError('To update, first create a user. The email was not found')
            return user. _id
        })()
    },

    registerPacient(name, surname, phone, bdate, PcrDate, arrayOfContacts, sintoms, userId){
        if (typeof name !== 'string') throw new TypeError('name  is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')
        if (typeof surname !== 'string') throw new TypeError('surname is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')
        if (typeof phone !== 'number') throw new TypeError('phone is not a number')
        if (typeof bdate !== 'number') throw new TypeError('birthdate is not a valid number')
        if (typeof PcrDate !== 'number') throw new TypeError('birthdate is not a valid number')
        if (typeof userId !== 'string') throw new TypeError('userId is not a string')
        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')
        if (!(arrayOfContacts instanceof Array)) throw new TypeError('contacts is not an array')
        if (!(sintoms instanceof Array)) throw new TypeError('sintoms is not an array')
            

        return (async () => {
            const session = await mongoose.startSession()
                //check no other pacient with this phone
            try{
                session.startTransaction()
                const p = await Pacient.findOne({phone});
                if(p){
                    throw new Error('Existing phone')
                } 
                //create pacient
                const birthdate = new Date(bdate)
                const PCRDate = new Date(PcrDate)

                let sintomsObjectId = sintoms.map(x=> new mongoose.mongo.ObjectId(x)) 
                const countOfSintoms = await Sintoms.find({ '_id': { $in: sintomsObjectId } } )
                if(countOfSintoms.length !== sintomsObjectId.length) throw new Error('Incorrect id in the sintoms array')
                let contactsIds = []
                if(arrayOfContacts && arrayOfContacts.length) {
                    contactsIds = await Contact.insertMany(arrayOfContacts, {session: session, upsert: true})
                }

                const pacient = await Pacient.create([{ name, surname, phone, birthdate, PCRDate, 'sintoms' : sintomsObjectId, 'createdBy': new mongoose.mongo.ObjectId(userId), 'contacts': contactsIds }], {session: session})
                if(!pacient) {
                    await session.abortTransaction()
                    session.endSession()
                    throw new Error('No pacient was saved')
                }
                
                
                await session.commitTransaction()
                session.endSession()
                
                return pacient[0]._id
                
            } catch(err){
                await session.abortTransaction()
                session.endSession()
                return Promise.reject(err)
            }
            
           
        })();
    },


     /**
     * Retrieves sintoms by lang
     * 
     * @param {String} lang 
     */
    getSintoms(lang) {
        return (async () => {
            let options = {}
            if(!lang) lang= 'cat' 
            if(lang === 'es') {
                options = {'sintoma_es':1}
            } else if (lang === 'eng'){
                options = {'sintoma_eng':1}
            } else {
                options = {'sintoma_cat':1}
            }
            let sintoms = await Sintoms.find({},options)
            return sintoms
        })()
    },


    getAllPacients(){
        return (async () => {
            return Pacient.find({});
        })();
    },


    getPacientDetail(id, lang='cat'){
        if(!id) throw new Error('patient id must be defined')
        let projection = {}
        
        if(lang === 'es'){
            projection = {
                'sintoms.sintoma_cat' : 0,
                'sintoms.sintoma_eng' : 0,
            }
        } else if(lang === 'eng') {
            projection = {
                'sintoms.sintoma_cat' : 0,
                'sintoms.sintoma_es' : 0,
            }
        } else {
            projection = {
                'sintoms.sintoma_eng' : 0,
                'sintoms.sintoma_es' : 0,
            }
        }
        

        return (async () => {
            const pacient = await Pacient.aggregate([
                {
                  '$match': {
                    '_id': new mongoose.mongo.ObjectId(id)
                  }
                }, {
                  '$lookup': {
                    'from': 'sintoms', 
                    'localField': 'sintoms', 
                    'foreignField': '_id', 
                    'as': 'sintoms'
                  }
                }, {
                  '$lookup': {
                    'from': 'contacts', 
                    'localField': 'contacts', 
                    'foreignField': '_id', 
                    'as': 'contacts'
                  }
                },
                {
                    "$project": projection
                }
              ])
            return pacient[0];
        })()
    },


    getContactsByPacientId(id){
        if(!id) throw new Error('pacient id must be defined')
        const projection = {
            '_id': 0,
            'contacts._id' : 1,
            'contacts.name' : 1,
            'contacts.surname' : 1,
            'contacts.phone' : 1,
        }
        return (async () => {
            const contacts = await Pacient.aggregate([
                {
                  '$match': {
                    '_id': new mongoose.mongo.ObjectId(id)
                  }
                }, {
                  '$lookup': {
                    'from': 'sintoms', 
                    'localField': 'sintoms', 
                    'foreignField': '_id', 
                    'as': 'sintoms'
                  }
                }, {
                  '$lookup': {
                    'from': 'contacts', 
                    'localField': 'contacts', 
                    'foreignField': '_id', 
                    'as': 'contacts'
                  }
                },
                {
                    "$project": projection
                }
              ])
              if(!contacts || !contacts[0]) return null
              return contacts[0].contacts
        })()
        
    },

    deletePacient(pacientid){
        
        if(!pacientid) throw new Error('pacientid must not be null')
        //delete contacts
        //delete pacient
        return (async () => {
            const session = await mongoose.startSession()
                //check no other pacient with this phone
            try{
                session.startTransaction()
                //check existing pacient
                const pacient = await Pacient.findOne({'_id': new mongoose.mongo.ObjectId(pacientid)});
                if(!pacient) throw new Error('Not existing pacientId')

                if(pacient.contacts && pacient.contacts.length){
                    const contactsIds = pacient.contacts.map(x=>new mongoose.mongo.ObjectId(x))
                    const deleteContacts =  await Contact.deleteMany({
                        '_id': {
                            $in: contactsIds
                        }
                    })
                }
                const deletePacient = await Pacient.deleteOne({_id: pacient._id})
                session.commitTransaction()
                session.endSession()
                return 'ok'
            } catch(err){
                await session.abortTransaction()
                session.endSession()
                return Promise.reject(err)
            }
            
           
        })();
    },


    updatePacient(pacientid, name, surname, phone, bdate, PcrDate, arrayOfContacts, sintoms, userId){
        if (!pacientid) throw new EmptyError('pacientid cannot be empty')
        if (typeof name !== 'string') throw new TypeError('name  is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')
        if (typeof surname !== 'string') throw new TypeError('surname is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')
        if (typeof phone !== 'number') throw new TypeError('phone is not a number')
        if (typeof bdate !== 'number') throw new TypeError('birthdate is not a valid number')
        if (typeof PcrDate !== 'number') throw new TypeError('birthdate is not a valid number')
        if (typeof userId !== 'string') throw new TypeError('userId is not a string')
        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')
        if (!(arrayOfContacts instanceof Array)) throw new TypeError('contacts is not an array')
        if (!(sintoms instanceof Array)) throw new TypeError('sintoms is not an array')

        return (async () => {
            const session = await mongoose.startSession()
            try{
                session.startTransaction()
                //check existing phone
                const existingPacient = await Pacient.findOne({'_id': pacientid});
                if(!existingPacient){
                    throw new Error('Non Existing phone')
                } 

                //update pacient
                const birthdate = new Date(bdate)
                const PCRDate = new Date(PcrDate)

                let sintomsObjectId = sintoms.map(x=> new mongoose.mongo.ObjectId(x)) 
                const countOfSintoms = await Sintoms.find({ '_id': { $in: sintomsObjectId } } )
                if(countOfSintoms.length !== sintomsObjectId.length) throw new Error('Incorrect id in the sintoms array')
                let contactsIds = []
                if(arrayOfContacts && arrayOfContacts.length) {
                    contactsIds = await Contact.insertMany(arrayOfContacts, {session: session, upsert: true})
                }

                const pacient = await Pacient.findOneAndUpdate({'_id': pacientid} , {name, surname, phone, birthdate, PCRDate, 'sintoms' : sintomsObjectId, 'createdBy': new mongoose.mongo.ObjectId(userId), 'contacts': contactsIds }, {session: session})
                if(!pacient) {
                    await session.abortTransaction()
                    session.endSession()
                    throw new Error('No pacient was saved')
                }

                
                //delete previous pacients in case it has
                if(existingPacient.contacts && existingPacient.contacts.length){
                    const contactsIds = existingPacient.contacts.map(x=>new mongoose.mongo.ObjectId(x))
                    const deleteContacts =  await Contact.deleteMany({
                        '_id': {
                            $in: contactsIds
                        }
                    })
                }
                
                await session.commitTransaction()
                session.endSession()
                
                return {'_id': pacient._id}
                
            } catch(err){
                await session.abortTransaction()
                session.endSession()
                return Promise.reject(err)
            }
        })();
    },

    getStats(){
        return (async () => {
            const result =  await Pacient.aggregate([
                {
                    '$project': {
                        '_id': 0, 
                        'nsintoms': {
                        '$cond': {
                            'if': {
                            '$isArray': '$sintoms'
                            }, 
                            'then': {
                            '$size': '$sintoms'
                            }, 
                            'else': 'NA'
                        }
                        }, 
                        'ncontacts': {
                        '$cond': {
                            'if': {
                            '$isArray': '$contacts'
                            }, 
                            'then': {
                            '$size': '$contacts'
                            }, 
                            'else': 'NA'
                        }
                        }
                    }
                }
            ])

            return result
        
        })()
    },


    getFrequencySintoms(lang='cat'){
        let langquery = null
        if(lang === 'es'){
            langquery = '$sintoms.sintoma_es'
        } else if(lang === 'eng') {
            langquery = '$sintoms.sintoma_eng'
        } else {
            langquery = '$sintoms.sintoma_cat'
        }
        

        return (async () => {
            const result =  await Pacient.aggregate(
                [
                    {
                      '$lookup': {
                        'from': 'sintoms', 
                        'localField': 'sintoms', 
                        'foreignField': '_id', 
                        'as': 'sintoms'
                      }
                    }, {
                      '$project': {
                        '_id': 0, 
                        'sintoms': 1
                      }
                    }, {
                      '$unwind': {
                        'path': '$sintoms'
                      }
                    }, {
                      '$project': {
                        'sintoma': langquery
                      }
                    }, {
                      '$group': {
                        '_id': '$sintoma', 
                        'count': {
                          '$sum': 1
                        }
                      }
                    }
                ])

            return result
        
        })()
    },


    retrieveAll(){
        return (async () => {
            return User.find({}).select("-password -__v");
        })();
    },

    deleteUser(userId){        
        if(!userId) throw new Error('userId must not be null')
        return (async () => {
                const deleteUser = await User.deleteOne({_id: userId})
                if(deleteUser.deletedCount) return 'ok'             
                return 'No user with id' + userId
        })();
    }
}

module.exports = logic