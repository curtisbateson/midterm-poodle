module.exports = function findScheduleOption(eventID, knex) {
    return knex('schedule_options').where({ event_id: eventId }).returning('id').first()
        .then(id => {
            return id;
        })
};
