
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
      tbl.increments();
      tbl.string('name', 125).notNullable().unique()
      tbl.integer('cohort_id').unsigned();
      tbl.foreign('cohort_id').references('cohorts.id');
      tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
