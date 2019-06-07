const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const db = require('./data/model-db');
const restricted = require('./data/auth/restricted-middleware');
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
server.get('/api/users', restricted, async (req, res) => {
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
server.get('/api/users/:id', restricted, async (req, res) => {
    const { id } = req.params;

    try {
        const userById = await db.findById(id);
        res.json({
            message: `Successfully retrieved user with id ${id}`,
            userById
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem retrieving user with id ${id} from the database`,
            error
        });
    }
});

//POST register new user
server.post('/api/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

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
    const { username, password } = req.body;

    if (username && password) {
        try {
            const user = await db.findByUser(username);
            if (user && bcrypt.compareSync(password, user.password)) {
                return res
                    .status(200)
                    .json({ message: `Welcome ${user.username}` });
            } else {
                res.status(401).json({
                    message: `Invalid credentials`
                });
            }
        } catch (error) {
            res.status(500).json({
                error: `There was a problem logging in`,
                error
            });
        }
    } else {
        res.status(400).json({ message: `Please provide valid credentials` });
    }
});

server.put('/api/users/:id', restricted, async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const updatedUser = await db.update(id, body);
        res.json({
            message: `Successfully updated user with id ${id}`,
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem updating user with id ${id}`,
            updatedUser
        });
    }
});

server.delete('/api/users/:id', restricted, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = db.remove(id);
        res.json({
            message: `Successfull deleted user with id ${id}`,
            deletedUser
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem removing user with id ${id}`,
            deletedUser
        });
    }
});

module.exports = server;
