
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organizers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('organizers').insert({name: 'Greg', email: 'greg@pood.le'}),
        knex('organizers').insert({name: 'Ili', email: 'ili@pood.le'}),
        knex('organizers').insert({name: 'Mike', email: 'mike@pood.le'})
      ]);
    });
};
