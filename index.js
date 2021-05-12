require('dotenv').config()
require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const logsMiddleware = require('./middlewares/authorizationmd/LogMiddleware')
const verifyAuth = require('./middlewares/authorizationmd/AuthMiddleware')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const https = require('https')
const http = require('http')
var fs = require('fs');
const JWT_SECRET = "MYSECRET"

const { registerUser, 
    authenticateUser, 
    updateUser, 
    retrieveUser,
    addPacient,
    retrieveSintoms,
    getAllPacients,
    getPacientDetail,
    getContactsByPacientId,
    deletePacientById,
    updatePacientById,
    getStats,
    getFrequencySintoms,
    retrieveAllUsers,
    deleteUser
 } = require('./routes')

 const getContacts = 'getContacts'
 const getPacients = 'getPacients'
 const createPacient = 'createPacient'
 const getSintoms = 'getSintoms'
 const deletePacient = 'deletePacient'
 const updatePacient = 'updatePacient'
 const stats = 'getStats'
 const delUser = 'deleteUser'

//mongoose.connect(DB_URL, { useNewUrlParser: true,  useFindAndModify: false  })
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useFindAndModify: false  })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET //Initialize key for token
        const app = express() //Express server
        const jsonBodyParser = bodyParser.json() //Bodyparser for body
        const router = express.Router() //router

        var key = fs.readFileSync(__dirname + '/cert/key.pem');
        var cert = fs.readFileSync(__dirname + '/cert/cert.pem');
        var options = {
          key: key,
          cert: cert
        };
        //openssl genrsa -out key.pem
        //openssl req -new -key key.pem -out csr.pem
        //openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

        app.use(express.json({limit: '50mb'})); //Set more limit to size because otherwise it refuses size = 1MB
        app.use(express.urlencoded({limit: '50mb'}));
        app.use('/api', router)
        router.use(cors()) //Para el Cors, evita el bloqueo del navegador por seguridad cuando hace llamadas a diferentes URLs.
        //Faltará implementar middlewares de authorization que puede requerir llamar a BD.

        //doc
        router.use('/api-docs', swaggerUi.serve);
        router.get('/api-docs', swaggerUi.setup(swaggerDocument));

        //user
        router.post('/user', jsonBodyParser, registerUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.put('/user/update', jsonBodyParser, updateUser)
        router.get('/retrieveuser', [tokenVerifierMiddleware], retrieveUser)
        router.get('/users', [jsonBodyParser, tokenVerifierMiddleware], retrieveAllUsers )//4
        router.delete('/user/:userid',[jsonBodyParser,tokenVerifierMiddleware, logsMiddleware(delUser)], deleteUser ) //4

        //pacients and contacts
        router.post('/pacient', [jsonBodyParser, tokenVerifierMiddleware, logsMiddleware(createPacient), verifyAuth(createPacient)], addPacient)
        router.get('/pacients', [tokenVerifierMiddleware, logsMiddleware(getPacients), verifyAuth(getPacients)], getAllPacients)
        router.get('/pacient/:pacientid', [tokenVerifierMiddleware, logsMiddleware(getPacients), verifyAuth(getPacients)], getPacientDetail)
        router.get('/contacts/:pacientid', [tokenVerifierMiddleware, logsMiddleware(getContacts), verifyAuth(getContacts)], getContactsByPacientId )
        router.delete('/pacient/:pacientid', [tokenVerifierMiddleware, logsMiddleware(deletePacient), verifyAuth(deletePacient)], deletePacientById)
        router.put('/pacient/:pacientid',[jsonBodyParser, tokenVerifierMiddleware, logsMiddleware(updatePacient), verifyAuth(updatePacient)], updatePacientById) //4

        //Sprint4 --> Editar una vez creado el pacient la lista de contactos (añadir y eliminar) y el propio paciente
        //sintoms eng, cat, es
        router.get('/sintoms/:lang', [jsonBodyParser, tokenVerifierMiddleware,logsMiddleware(getSintoms), verifyAuth(getSintoms)], retrieveSintoms)


        router.get('/stats',[jsonBodyParser, tokenVerifierMiddleware, logsMiddleware(stats), verifyAuth(stats)], getStats)//4
        router.get('/stats-freq-sin/:lang',[jsonBodyParser, tokenVerifierMiddleware,logsMiddleware(stats), verifyAuth(stats)], getFrequencySintoms)//4


        var server =  http.createServer(app)
        server.listen(process.env.PORT || 8080, ()=> console.log("http listening on port " + process.env.PORT))
        //var server = https.createServer(options, app);
        //server.listen(PORT, ()=> console.log("https listening on port " + PORT))
    })
    .catch(console.error)
