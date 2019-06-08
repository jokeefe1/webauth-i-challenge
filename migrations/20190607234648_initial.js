
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username').unique().notNullable()
      tbl.string('password').notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropIfTableExists('users')
};


