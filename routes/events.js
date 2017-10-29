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
 
    
  })
  
  router.post("/:id/dates", (req, res) => {  
    res.redirect("/:id/organizer")
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
    insertDatabase(req.session, knex)
    res.redirect("/:id")

  })

  router.get("/:id", (req, res) => {

  })

  router.post("/:id", (req, res) => {
  })

  return router;
}
