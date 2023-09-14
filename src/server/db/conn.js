const { MongoClient } = require("mongodb");

//const Db = process.env.ATLAS_URI;

const remote_db = "mongodb+srv://billson:sausage_crisp@cluster0.onq0ehe.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(remote_db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db)
      {
        _db = db.db("cluster0")
        console.log("Successfully connected to MongoDB")
      }
      return callback(err)
    })
  },

  getDb: function () {
    return _db;
  },
};