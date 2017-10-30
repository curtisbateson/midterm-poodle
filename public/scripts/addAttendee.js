module.exports = function addAttendee(attendee, knex) {
  let attendee_info = {
    name: attendee.name,
    email: attendee.email,
    event_id: attendee.event_id
  }
 return knex.insert([attendee_info]).into("attendees").returning("id")
  .then(id => {
    return parseInt(id[0], 10)
  })
  .then(attendeeID => {
    var attendArr = []
    
    for (let option in attendee.schedule_options){
      attendArr.push({schedule_option_id: parseInt(attendee.schedule_options[option], 10), attendee_id: attendeeID})
    } 
    return knex.batchInsert("selected_options", attendArr, 10).returning("attendee_id").then(data => {
    })
  })
  
}
