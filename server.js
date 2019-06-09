const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const SessionStore = require('connect-session-knex')(session)
const protected = require('./middleware-protected/middleware-protected')
const routeLogin = require('./routeLogin/routeLogin')
const routeLogout = require('./routeLogout/routeLogout')
const routeRegister = require('./routeRegister/routeRegister')
const routeUsers = require('./routeUsers/routeUsers')
const server = express()

const sessionConfig = {
    name: 'notsession',
    secret: 'nobody tosses a dwarf',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
        knex: require('./data/dbConfig'),
        tableName: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60 * 24
    })
}

server.use(express.json())
server.use(helmet())
server.use(session(sessionConfig))
server.use('/api/login', routeLogin)
server.use('/api/logout', routeLogout)
server.use('/api/register', routeRegister)
server.use('/api/users', routeUsers)


server.get('/', protected, (req, res) => {
    try {
        res.json({ message: `Successfully reached api`})
    } catch (error) {
        res.status(500).json({ error: `Error reaching api`})
    }
})


module.exports = server
