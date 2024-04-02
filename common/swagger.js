const swaggerAutogen = require('swagger-autogen')();

const outputFile = '../swagger.json';

// add swagger endpoints files later as APIs increase
const endpointsFiles = ['../server/index.js']; // Replace with your actual endpoints files

const doc = {
    info: {
        title: 'API Documentation',
        description: 'Documentation for your API',
        version: '1.0.0',
    },
    host: 'localhost:3000', // Replace with your actual host
    basePath: '/',
    schemes: ['http'], // Replace with your actual schemes (http, https, etc.)
};

swaggerAutogen(outputFile, endpointsFiles, doc);