const express = require('express')
const db = require('../data/model-users')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/', async (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    if (user) {
        try {
            const newUser = await db.add(user)
            res.json({ message: `Successfully added user`, newUser})
        } catch (error) {
            res.status(500).json({ error: `Failed to add user`})
        }
    } else {
        res.status(400).json({ message: `Please providd valid credentials`})
    }
})
module.exports = router