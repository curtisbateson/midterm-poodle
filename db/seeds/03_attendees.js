
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attendees').del()
    .then(() => {
      return knex('events').select('id').orderBy('title');
    })
    .then(function (queryResult) {
      return Promise.all([
        // Inserts seed entries
        knex('attendees').insert({event_id: queryResult[0].id, name: 'Dude1', email: 'dude1@pood.le'}),
        knex('attendees').insert({event_id: queryResult[1].id, name: 'Dude2', email: 'dude2@pood.le'}),
        knex('attendees').insert({event_id: queryResult[2].id, name: 'Dudette', email: 'dudette@pood.le'})
      ]);
    });
};
