"use strict";

const express         = require('express');
const router          = express.Router();
const app             = express();
const session         = require('cookie-session')
const getEvent        = require('../public/scripts/getEvent.js')
const generateId      = require('../public/scripts/generateID.js')
const insertDatabase  = require('../public/scripts/insertDatabase.js')
const addAttendee     = require('../public/scripts/addAttendee.js')





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
    let title = req.body.title;
    let description = req.body.description;
    console.log(title);
    req.session.event = {
      description: req.body.description,
      title: req.body.title,
      longId: longId
    }
    console.log("before if!")
    if (!title || !description) {
      console.log("no title")
      res.status(400)
      res.send("please input a title.")
    } else {
      console.log("in the else");
      res.redirect("/events/" + longId + "/dates") 
    }   
 });                    
        
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
