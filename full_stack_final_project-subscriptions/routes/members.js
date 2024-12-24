const express = require('express');
const membersService = require('../services/membersService');
const axios = require('axios');
const router = express.Router();

// Populate Members
router.get('/populate', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const members = response.data.map(user => ({
            name: user.name,
            email: user.email,
            city: user.address.city,
        }));
        membersService.saveAllMembers(members);
        res.status(200).send('Members populated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;