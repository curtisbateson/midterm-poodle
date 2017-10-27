
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schedule_options').del()
    .then(() => {
      return knex('events').select('id').orderBy('title');
    })
    .then(function (queryResult) {
      return Promise.all([
        // Inserts seed entries
        knex('schedule_options').insert({event_id: queryResult[0].id, date: '2017-11-10', time: '11:00'}),
        knex('schedule_options').insert({event_id: queryResult[1].id, date: '2017-11-11', time: '12:00'}),
        knex('schedule_options').insert({event_id: queryResult[2].id, date: '2017-11-12', time: '13:00'})
      ]);
    });
};
