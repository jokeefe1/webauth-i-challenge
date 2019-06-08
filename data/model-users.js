const db = require('./dbConfig')

function add(user) {
    return db('users').insert(user)
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id })
}

function findByUser(username) {
    return db('users').where({ username })
}

function update(id, user) {
    return db('users').where({ id }).insert(user)
}

function remove(id) {
    return db('users').delete(id)
}

module.exports = {
    add,
    find,
    findById,
    findByUser,
    update,
    remove
}
