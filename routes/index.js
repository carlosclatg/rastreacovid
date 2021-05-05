module.exports = {
    
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    updateUser : require('./update-user'),

    retrieveUser : require('./retrieve-user'),

    addPacient: require('./add-pacient'),

    retrieveSintoms: require('./retrieve-sintoms'),

    getAllPacients: require('./get-all-pacients'),

    getPacientDetail: require('./get-pacient-detail'),

    getContactsByPacientId: require('./get-contacts-by-pacientid'),

    deletePacientById: require('./delete-pacient'),

    updatePacientById: require('./update-pacient'),

    getStats: require('./get-stats'),

    getFrequencySintoms: require('./get-freq-sin'),

    retrieveAllUsers: require('./retrieve-all'),

    deleteUser: require('./delete-user')

}