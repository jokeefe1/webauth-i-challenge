const db = require('../data/model-users')

function protected(req, res, next) {
    if (req.session && req.session.user) {
        next()  
    } else {
        res.status(401).json({ message: `You shall not pass!!!`})
    }
}

module.exports = protected