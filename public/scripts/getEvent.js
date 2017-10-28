const snowball = {};

module.exports = function getEvent(longId, knex) {
    knex.select().from('events').where({long_identifier: longId})
        .then(data => {
            var dataJson = JSON.parse(JSON.stringify(data))
            snowball.event = dataJson[0]
            return dataJson[0].id
        })
    .then(eventId => {
        knex.select().from('attendees').where({event_id: eventId})
            .then(data => {
                var dataJson = JSON.parse(JSON.stringify(data))
                snowball.attendees = dataJson[0]
                return snowball.event.organizer_id
            })
        .then(organizerId => {
            knex.select().from('organizers').where({id: organizerId})
                .then(data => {
                    var dataJson = JSON.parse(JSON.stringify(data))
                    snowball.organizers = dataJson[0]
                    return snowball.event.id
                })
            .then(eventId => {
                knex.select().from('schedule_options').where({ event_id: eventId })
                    .then(data => {
                        var dataJson = JSON.parse(JSON.stringify(data))
                        snowball.schedule_options = dataJson[0]
                        return snowball.schedule_options.id
                        
                    })
                .then(scheduleId => {
                    knex.select().from('selected_options').where({schedule_option_id: scheduleId })
                        .then(data => {
                            var dataJson = JSON.parse(JSON.stringify(data))
                            snowball.selected_options = dataJson[0]
                            console.log(snowball)
                            return snowball
                        })
                })

            })
        })
    })
};


// getEvent('gregilimikecurtis1')




