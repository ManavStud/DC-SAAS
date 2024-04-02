const {connectToMongoDB} = require('./common/mongo');

(async () => {
    await connectToMongoDB();
})();

const startApp = () => {
    switch (process.env.SERVER_MODE){
        case 'worker':
            require('./worker');
            break;
        default:
            require('./server');
    }
}

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    // Add your code here to gracefully shutdown the application
    // For example, you can close database connections, stop any running processes, etc.
    process.exit(0);
});

startApp();