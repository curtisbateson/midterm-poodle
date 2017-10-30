module.exports = function addAttendee(attendee, knex) {
  let attendee_info = {
    name: attendee.attendee_data.name,
    email: attendee.attendee_data.email,
    event_id: attendee.event_id,
  }
 return knex.insert([attendee_info]).into("attendees").returning("id")
  .then(id => {
    return id[0]
  })
  .then(attendeeID => {
    for (let option in attendee.schedule_options){
     return knex('selected_options').insert({
        schedule_option_id: attendee.schedule_options[option],
        attendee_id: Number(attendeeID)
      })
      .returning('schedule_option_id')
      .then(scheduleOptionId => {
      })
    }
  }) 
}
