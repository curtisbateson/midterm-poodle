"use strict";

const express       = require('express');
const router        = express.Router();
const generateId    = require('../public/scripts/app.js')
const cookie        = require('cookie-parser')
const app           = express();

app.use(cookie())

module.exports = (knex) => {

    router.get("/", (req, res) => {
        res.render("create")
    });

    router.post("/", (req, res) => {
        let eventDescription = req.body.event_description;
        let eventTitle = req.body.event_title;
        let longId = generateId();

        let cookieObj = {
        eventCookie: res.cookie("eventCookie", eventDescription),
        titleCookie: res.cookie("titleCookie", eventTitle),
        longIdCookie:res.cookie("longIdCookie", longId)
        };
        res.redirect("/events/" + longId + "/dates")
    })
    
    router.get("/:id/dates", (req, res) => {

        console.log(cookieObj.eventCookie);
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
