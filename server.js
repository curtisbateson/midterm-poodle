"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const session     = require('cookie-session')
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const eventRoutes = require('./routes/events');
const flash       = require('connect-flash');
// const exSession     = require('express-session');

// app.use(exSession({
//   secret: 'anystringoftext',
//   saveUninitialized: true,
//   resave: true}));

app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(session({
  name: 'session',
  keys: ["curtisbeard"]
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use("/events", eventRoutes(knex))

// app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});