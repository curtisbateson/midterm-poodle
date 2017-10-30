"use strict";

const express         = require('express');
const router          = express.Router();
const app             = express();
const session         = require('cookie-session')
const getEvent        = require('../public/scripts/getEvent.js')
const generateId      = require('../public/scripts/generateID.js')
const insertDatabase  = require('../public/scripts/insertDatabase.js')
const addAttendee     = require('../public/scripts/addAttendee.js')

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("name")
  });
  

  router.post("/option", (req, res) => {
    req.session.buttonSelections.push(req.body.button)
    res.sendStatus(200);

  })
 
  router.post("/", (req, res) => {
    let longId = generateId();
    req.session.event = {
      description: req.body.description,
      title: req.body.title,
      longId: longId
    }
    res.redirect("/events/" + longId + "/dates")        
  })                    
  
  router.get("/:id/dates", (req, res) => {
    res.render("dates")  
    let id = req.session.event.longId
  
  })
  
  router.post("/:id/dates", (req, res) => { 
    req.session.schedule_options = [];
    for(var i = 0; i < req.body.dates.length; i++){
      req.session.schedule_options.push({
        date: req.body.dates[i].slice(0, 15),
        time: req.body.times[i]
      })
    }
  let id = req.session.event.longId
    res.redirect("/events/" + id + "/organizer")
  })
  
  router.get("/:id/organizer", (req, res) => {
    let id = req.session.event.longId
    res.render("organizer", {id})
  })

  router.post("/:id/organizer", (req, res) => {
    req.session.organizer = {
      name: req.body.name,
      email: req.body.email
    }
    let id = req.session.event.longId
    insertDatabase(req.session, knex).then(data => {
      res.redirect("/events/" + id)
    })
    

  })

  router.get("/:id", (req, res) => {
    let id = req.params.id
    req.session.buttonSelections = [];

    getEvent(id, knex).then(snowball => {

      req.session.current_event = snowball.event.id 
      res.render("event", snowball)
    })
  })

  router.post("/:id", (req, res) => {
    let id = req.session.event.longId
    var attendee = {
      schedule_options: req.session.buttonSelections,
      event_id: req.session.current_event,
      email: req.body.email,
      name: req.body.name
    }
    addAttendee(attendee, knex).then(data => {
      res.redirect("/events/" + id)
    })
  })
  
  
  return router;
}
