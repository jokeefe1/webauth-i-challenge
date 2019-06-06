const express = require('express')
const helmet = require('helmet')
const server = express()

server.use(express.json())
server.use(helmet())

server.get('/', (req,res) => {
    try {
        res.json({ message: `Successfully accessed the api`})
    } catch (error) {
        res.status(500).json({ error: `There was a problem accessing the api`, error})
    }
})

server.get('/api/users', (req, res) => {
    try {
        
    } catch (error) {

    }
})

module.exports = server