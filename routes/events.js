"use strict";

const express       = require('express');
const router        = express.Router();
const generateId    = require('../public/scripts/generateID.js')
const session       = require('cookie-session')
const app           = express();
const getEvent     = require('../public/scripts/getEvent.js')

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("create")
  });

  router.post("/", (req, res) => {
    let longId = generateId();

    req.session.event_description = req.body.event_description;
    req.session.eventTitle = req.body.event_title;
    req.session.longId = longId

    res.redirect("/events/" + longId + "/dates")        
  })                    
        
  router.get("/:id/dates", (req, res) => {
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
    res.render("dates")  
    console.log(getEvent('gregilimikecurtis1', knex))
    
  })
  
  router.post("/:id/dates", (req, res) => {  
    res.redirect("/:id/owner")
  })

  router.get("/:id/owner", (req, res) => {
    res.render("owner")
  })

  router.post("/:id/owner", (req, res) => {
    req.session.name = req.body.name
    req.session.email = req.body.email
    res.redirect("/:id")

  })

  router.get("/:id", (req, res) => {
  })

  router.post("/:id", (req, res) => {
  })

  return router;
}
