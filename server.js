const express = require('express')
const helmet = require('helmet')
const routeLogin = require('./routeLogin/routeLogin')
const routeLogout = require('./routeLogout/routeLogout')
const routeRegister = require('./routeRegister/routeRegister')
const routeUsers = require('./routeUsers/routeUsers')
const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/login', routeLogin)
server.use('/api/logout', routeLogout)
server.use('/api/register', routeRegister)
server.use('/api/users', routeUsers)


server.get('/', (req, res) => {
    try {
        res.json({ message: `Successfully reached api`})
    } catch (error) {
        res.status(500).json({ error: `Error reaching api`})
    }
})


module.exports = server
