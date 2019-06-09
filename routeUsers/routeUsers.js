const express = require('express')
const db = require('../data/model-users')
const protected = require('../middleware-protected/middleware-protected')
const router = express.Router()

router.get('/', protected, async (req, res) => {
    try {
        const getUsers = await db.find()
        console.log(getUsers)
        res.json({ message: `Successfully retrieved all users`, getUsers})
    } catch (error) {
        res.status(500).json({ error: `Error retrieving users`})
    }
})

module.exports = router