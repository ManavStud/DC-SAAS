const {Agenda} = require('@hokify/agenda');

const agenda = new Agenda();


const startWorker = () => {
    agenda.start();
    console.log('Worker started');
}

startWorker();