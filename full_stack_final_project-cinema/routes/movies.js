const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get All Movies
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/movies');
        res.json(response.data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
