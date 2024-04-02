const {Agenda} = require('@hokify/agenda');
const { getMongoURL } = require('./mongo');
module.exports = new Agenda({
    db: { address: getMongoURL(), collection: 'agendaJobs' }
});;