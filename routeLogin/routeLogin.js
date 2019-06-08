const express = require('express')
const db = require('../data/model-users')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/', (req, res) => {
    const credentials = req.body
    // const username = req.headers['x-username']
    // const password = req.headers['x-password']
    // console.log('Username', username)
    // console.log('Password', password)
    
    console.log(credentials)

    // if (credentials.username && credentials.password) {
    //     try {
    //         const dbUser = await db.findByUser(credentials.username)
    //         if (dbUser && bcrypt.compareSync(credentials.password, dbUser.password)) {
    //             res.json({ message: `Successfully logged in user`, dbUser})
    //         } else {
    //             res.status(401).json({ message: `Login failed`})
    //         }
    //     } catch (error) {
    //         res.status(500).json({ error: `There was a problem with the server logging in user`, error})
    //     }
    // } else {
    //     res.status(400).json({ message: `Please provide valid credentials`})
    // }

    res.json({ message: `Success!!!`})

})

module.exports = router