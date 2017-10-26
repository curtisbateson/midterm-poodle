"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

    router.get("/create", (req, res) => {
        res.render("eventCreation")
        res.send("1")
    });

    router.post("/create", (req, res) => {
        res.redirect("/:id/dates")
        res.send("2")
    })

    router.get("/:id/dates", (req, res) => {
         res.send("1")

    })

    router.post("/:id/dates", (req, res) => {

    })

    router.get("/:id/owner", (req, res) => {

    })

    router.post("/:id/owner", (req, res) => {

    })

    router.get("/:id", (req, res) => {
        res.send("GET IT")
    })

    router.post("/:id", (req, res) => {

    })

    return router;
}
