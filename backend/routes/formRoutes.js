const express = require('express');
const Form = require('../models/FormModel');
const router = express.Router();

// Submit Form
router.post('/submit', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(201).json({ message: "Form submitted successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Error submitting form" });
    }
});

// Get All Submissions
router.get('/submissions', async (req, res) => {
    try {
        const submissions = await Form.find();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching submissions" });
    }
});

module.exports = router;
