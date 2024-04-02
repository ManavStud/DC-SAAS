const express = require('express');
const {Agenda} = require('@hokify/agenda');

const router = express.Router();

// Create a new instance of Agenda
const agenda = new Agenda();

// Define the route for scheduling a job
router.post('/schedule', async (req, res) => {
    try {
        const { name, schedule } = req.body;

        // Define your job logic here
        agenda.define(name, async (job) => {
            // Your job logic goes here
            console.log(`Job ${name} is running...`);
        });

        // Schedule the job
        await agenda.every(schedule, name);

        res.status(200).json({ message: `Job ${name} scheduled successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the route for checking the status of a job
router.get('/status/:name', async (req, res) => {
    try {
        const { name } = req.params;

        // Get the job by name
        const job = await agenda.jobs({ name });

        if (job.length === 0) {
            res.status(404).json({ error: `Job ${name} not found` });
        } else {
            res.status(200).json({ status: job[0].attrs.nextRunAt ? 'Scheduled' : 'Completed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;