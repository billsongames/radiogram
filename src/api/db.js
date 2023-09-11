const { MomgoClient } = require('mongodb')

const remote_db_url = 'mongodb+srv://billson:rate_kip@cluster0.g7i9fqm.mongodb.net/?retryWrites=true&w=majority'
let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MomgoClient.connect(remote_db_url)
    .then((client) => {
      dbConnection = client.db()
      return cb()
    })
    .catch(err => {
      console.log(err)
      return cb(err)
    })
  },
  getDb: () => dbConnection
}