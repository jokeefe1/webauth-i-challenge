const express = require('express')
const db = require('../data/model-users')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.post('/', async (req, res) => {
    const credentials = req.body
    // const username = req.headers['x-username']
    // const password = req.headers['x-password']
    // console.log('Username', username)
    // console.log('Password', password)
    
    if (credentials.username && credentials.password) {
        try {
            const dbUser = await db.findByUser(credentials.username)
            console.log(dbUser)
            if (dbUser && bcrypt.compareSync(credentials.password, dbUser.password)) {
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