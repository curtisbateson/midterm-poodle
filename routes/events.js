"use strict";

const express       = require('express');
const router        = express.Router();
const generateId    = require('../public/scripts/generateID.js')
const session       = require('cookie-session')
const app           = express();
const getEvent     = require('../public/scripts/getEvent.js')

var testEvent = {
    event: {
        description: "This is my Poodle. There are many like it, but this one is mine. Four score and seventeen Poodles ago I have a dream that Poodles and Poodles can live together in harmony. Rule #1: Don't talk about Poodle Club. Rule #2: Don't talk about Poodle Club.",
        title: "Poodle Event Title",
        longId: "jn3iun3r"
    },
    options: {
        option1 : {
            date: "2017-11-01",
            time: "6:00"
        },
        option2 : {
            date: "2017-11-02",
            time: "6:00"
        }
    },
    organizer: {
        name: "Poodler",
        email: "poodler@example.com"
    }
}

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("name")
  });

  router.post("/", (req, res) => {
    let longId = generateId();

    req.session.event = {
    description: req.body.event_description,
    title: req.body.event_title,
    longId: longId
    }

    req.session.dates = {
      dateOne : {
          timeOne: "8:00",
          timeTwo: "9:00",
          TimeThree: "10:00"
        },
        dateTwo : {
          timeOne: "8:00",
          timeTwo: "9:00",
          TimeThree: "10:00"
        }
      }
      console.log(req.session)

    res.redirect("/events/" + longId + "/dates")        
  })                    
        
  router.get("/:id/dates", (req, res) => {
    res.render("dates")  
 
    
  })
  
  router.post("/:id/dates", (req, res) => {  
    res.redirect("/:id/organizer")
  })

  router.get("/:id/organizer", (req, res) => {
    
    
    res.render("owner")
  })

  router.post("/:id/organizer", (req, res) => {
    req.session.organizer = {
      name: req.body.name,
      email: req.body.email
    }
    res.redirect("/:id")

  })

  router.get("/:id", (req, res) => {
      res.render("event", testEvent);
  })

  router.post("/:id", (req, res) => {
  })

  return router;
}
