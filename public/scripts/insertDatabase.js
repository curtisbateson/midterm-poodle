module.exports = function insertDatabase(session, knex) {
  let sessionOrganizer = {
    name:   session.organizer.name, 
    email:  session.organizer.email 
  }
  knex.insert([sessionOrganizer]).into("organizers").returning("id")
  .then(id => {
    return id[0]
  })
  .then(organizerId => {
    let sessionEvent = { 
      organizer_id:     organizerId, 
      long_identifier:  session.event.longId, 
      title:            session.event.title, 
      description:      session.event.description }
      
      knex.insert([sessionEvent]).into("events").returning("id")
      .then(id => {
        console.log("testing "+id);
        let datesArr = []
        for (let date in session.dates) {
         knex('schedule_options').insert({
            event_id: Number(id),
            date: session.dates[date].day,
            time: session.dates[date].time
          })
          .returning('id')
          .then((id) => {
              console.log(id);
          });
        } 
        return Promise.all(datesArr);
        console.log(datesArr)
      })
  })
};

