const express = require('express')
const db = require('../data/model-users')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/', async (req, res) => {
    const username = req.headers['x-username']
    const password = req.headers['x-password']
  
    
    if (username && password) {
        try {
            const dbUser = await db.findByUser(username)
            if (dbUser && bcrypt.compareSync(password, dbUser.password)) {
                req.session.user = dbUser
                res.json({ message: `Successfully logged in user`, dbUser})
            } else {
                res.status(401).json({ message: `Login failed`})
            }
        } catch (error) {
            res.status(500).json({ error: `There was a problem with the server logging in user`, error})
        }
    } else {
        res.status(400).json({ message: `Please provide valid credentials`})
    }
})

module.exports = router