const bcrypt = require('bcrypt')
const db = require('../model-db')

async function restricted(req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        try {
            const user = await db.findByUser(username);
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
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
        res.status(400).json({ message: `Please provide valid credentials`})
    }
}

module.exports = restricted;
