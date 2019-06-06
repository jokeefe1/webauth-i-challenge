const express = require('express');
const helmet = require('helmet');
const db = require('./data/model-db');
const server = express();

server.use(express.json());
server.use(helmet());

//GET home api route
server.get('/', (req, res) => {
    try {
        res.json({ message: `Successfully accessed the api` });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem accessing the api`,
            error
        });
    }
});

//GET find all users
server.get('/api/users', async (req, res) => {
    try {
        const getAllUsers = await db.find();
        res.json({ message: `Successfully retrieved all users`, getAllUsers });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem retrieving users from the database`,
            error
        });
    }
});

//GET find user by id
server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const userById = await db.findById(id)
        res.json({ message: `Successfully retrieved user with id ${id}`, userById})
    } catch (error) {
        res.status(500).json({ error: `There was a problem retrieving user with id ${id} from the database`, error})
    }
})

//POST register new user
server.post('/api/register', async (req, res) => {
    const user = req.body;

    try {
        const registerUser = await db.add(user);
        res.json({ messge: `Successfully registered new user`, registerUser });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem registering the user`,
            error
        });
    }
});

//POST login user
server.post('/api/login', async (req, res) => {
    try {
    } catch (error) {}
});

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        const updatedUser = await db.update(id, body)
        res.json({ message: `Successfully updated user with id ${id}`, updatedUser})    
    } catch (error) {
        res.status(500).json({ error: `There was a problem updating user with id ${id}`, updatedUser})
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = db.remove(id)
        res.json({ message: `Successfull deleted user with id ${id}`, deletedUser})     
    } catch (error) {
        res.status(500).json({ error: `There was a problem removing user with id ${id}`, deletedUser})
    }
})

module.exports = server;
