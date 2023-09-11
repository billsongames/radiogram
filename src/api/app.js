const express = require("express")
const { connectToDb, getDb } = require('./db')

//init app & middelware
const app = express()

//db connection
let db

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000")
    })
    db = getDb()
  }
})    

//routes
app.get("/users", (req,res) => {
  let presets = []

  db.collection("users")
  .find( {userID: "123"}, presets )
  .forEach(preset => {presets.push(preset)
    
  });

  res.json({msg: "welcome to the api"})
})
