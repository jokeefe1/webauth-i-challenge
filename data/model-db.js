const db = require('./dbConfig')

function find() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}

function findByUser(username) {
    return db('users').where({ username }).first()
}

function add(user) {
    return db('users').insert(user)
}

function update(id, user) {
    return db('users').where({ id }).first().insert(user)
}

function remove(id) {
    return db('users').where({ id }).first().delete()
}


module.exports = {
    find,
    findById,
    findByUser,
    add,
    update,
    remove
}