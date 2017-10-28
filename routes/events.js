"use strict";

const express       = require('express');
const router        = express.Router();
const generateId    = require('../public/scripts/app.js')
const cookie        = require('cookie-parser')
const app           = express();

app.use(cookie())

module.exports = (knex) => {

    router.get("/", (req, res) => {
        res.render("name")
    });

    router.post("/", (req, res) => {
        let eventDescription = req.body.event_description;
        let eventTitle = req.body.event_title;
        let longId = generateId();

        res.cookie("eventCookie", eventDescription) 
        res.cookie("titleCookie", eventTitle)
        res.cookie("longIdCookie", longId)

        res.redirect("/events/" + longId + "/dates")
        
        
    })
    
    router.get("/:id/dates", (req, res) => {
    
        res.render("dates")


    })

    router.post("/:id/dates", (req, res) => {

    })

    router.get("/:id/owner", (req, res) => {

    })

    router.post("/:id/owner", (req, res) => {

    })

    router.get("/:id", (req, res) => {
    })

    router.post("/:id", (req, res) => {

    })

    return router;
}
