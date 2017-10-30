module.exports = function insertDatabase(session, knex) {
  let sessionOrganizer = {
    name:   session.organizer.name, 
    email:  session.organizer.email 
  }
  return knex.insert([sessionOrganizer]).into("organizers").returning("id")
  .then(id => {
    return id[0]
  })
  .then(organizerId => {
    let sessionEvent = { 
      organizer_id:     organizerId, 
      long_identifier:  session.event.longId, 
      title:            session.event.title, 
      description:      session.event.description }
      
      return knex.insert([sessionEvent]).into("events").returning("id")
      .then(id => {
        // let datesArr = []
        for (let option of session.schedule_options) {
         knex('schedule_options').insert({
            event_id: Number(id),
            date: option.date,
            time: option.time
          })
          .returning('id')
          .then((id) => {
            return id
          });
        } 
        // return Promise.all(datesArr);
      })
  })
};

