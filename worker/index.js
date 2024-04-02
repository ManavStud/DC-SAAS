// TODO: Figure out how to start the worker on a different port using the same agenda queue.
// Current setup runs job on same port as server. May affect scalability.
// const agenda = require("../common/agenda");

// const startWorker = async () => {
//     await agenda.start();
//     console.log(await agenda.jobs());
// }

// startWorker().then(() => {
//     console.log('Worker started')
// });