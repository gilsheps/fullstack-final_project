const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get All Subscriptions
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/subscriptions');
        res.json(response.data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
