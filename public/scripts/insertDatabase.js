// const settings = require("../../knexfile.js")

var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : "localhost",
    user     : "labber",
    password : "labber",
    database : "midterm",
    port     : 5432,
    ssl      : false
  },
});

knex.select().from("events").asCallback((err, result) => {
  if (err){
    console.log(err)
  }
  console.log(result)

  knex.destroy((cb) => {
    console.log("done")
  })
})