const express = require('express');
const jobRouter = require('./jobs');

const router = express.Router();

// Mount the internal routes on the router
router.use('/job', jobRouter);
// Add more route mounts as needed

module.exports = router;
