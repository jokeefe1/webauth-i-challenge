const db = require('./dbConfig')

function find() {
    return db('users').find()
}

function findById(id) {
    return db('users').where({ id })
}

function findByUser(user) {
    return db('users').where({ user })
}

function update(id, user) {
    return db('users').where({ id }).insert(user)
}

function remove(id) {
    return db('users').delete(id)
}

module.exports = {
    find,
    findById,
    findByUser,
    update,
    remove
}
