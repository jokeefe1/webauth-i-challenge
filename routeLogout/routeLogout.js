const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    if (req.session) {
        try {
            const sessionDeleted = await req.session.destroy()
            res.json({ message: `Successfully logged out`})
        } catch (error) {
            res.status(500).json({ error: `There was a problem logging out of server`, error})            
        }
    } else {
        res.json({ message: `Good bye`})
    }
});

module.exports = router