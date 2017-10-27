
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('selected_options').del()
    .then(() => {
      return Promise.all([
        knex('schedule_options').select('id').orderBy('id'),
        knex('attendees').select('id').orderBy('name')
      ]);
    })
    .then(function (queryResults) {
      return Promise.all([
        // Inserts seed entries
        knex('selected_options').insert({schedule_option_id: queryResults[0][0].id, attendee_id: queryResults[1][0].id}),
        knex('selected_options').insert({schedule_option_id: queryResults[0][1].id, attendee_id: queryResults[1][1].id}),
        knex('selected_options').insert({schedule_option_id: queryResults[0][2].id, attendee_id: queryResults[1][2].id})
      ]);
    });
};
