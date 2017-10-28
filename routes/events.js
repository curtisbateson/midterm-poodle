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
    
    
    res.render("organizer")
  })

  router.post("/:id/organizer", (req, res) => {
    req.session.organizer = {
      name: req.body.name,
      email: req.body.email
    }
    res.redirect("/:id")

  })

  router.get("/:id", (req, res) => {
  })

  router.post("/:id", (req, res) => {
  })

  return router;
}
