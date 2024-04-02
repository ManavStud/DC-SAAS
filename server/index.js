const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const appRouter = require('./api')
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/_healthz', (req, res) => {
    res.send({ok: 'OK'});
});

// now use app routes
app.use('/api', appRouter);

app.use('/:unresolved', (req, res) => {
    res.send({error: '404'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});