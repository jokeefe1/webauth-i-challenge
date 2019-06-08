const express = require('express')
const db = require('../data/model-users')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const getUsers = await db.find()
        res.json({ message: `Successfully retrieved all users`, getUsers})
    } catch (error) {
        res.status(500).json({ error: `Error retrieving users`})
    }
})

module.exports = router