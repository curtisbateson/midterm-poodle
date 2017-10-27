
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(() => {
      return knex('organizers').select('id').orderBy('name');
    })
    .then(function (queryResult) {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({organizer_id: queryResult[0].id, long_identifier: 'gregilimikecurtis1', title: 'thing1', description: 'This is an event'}),
        knex('events').insert({organizer_id: queryResult[1].id, long_identifier: 'gregilimikecurtis2', title: 'thing2', description: 'This is an event'}),
        knex('events').insert({organizer_id: queryResult[2].id, long_identifier: 'gregilimikecurtis3', title: 'thing3', description: 'This is an event'})
      ]);
    });
};
