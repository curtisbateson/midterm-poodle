exports.up = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
    .createTable('organizers', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
    }).createTable('events', function (table) {
        table.increments('id').primary();
        table.integer('organizer_id').references('id').inTable('organizers');
        table.string('long_identifier');
        table.string('title');
        table.string('description');
    }).createTable('attendees', function (table) {
        table.increments('id').primary();
        table.integer('event_id').references('id').inTable('events');
        table.string('name');
        table.string('email');
    }).createTable('schedule_options', function (table) {
        table.increments('id').primary();
        table.integer('event_id').references('id').inTable('events');
        table.date('date');
        table.time('time');
    }).createTable('selected_options', function (table) {
        table.unique(['schedule_option_id', 'attendee_id']);
        table.integer('schedule_option_id').references('id').inTable('schedule_options');
        table.integer('attendee_id').references('id').inTable('attendees');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('selected_options')
    .dropTable('schedule_options')
    .dropTable('attendees')
    .dropTable('events')
    .dropTable('organizers');
  };
  