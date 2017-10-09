require('dotenv').config()
const PouchDB = require('pouchdb')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL
const db = new PouchDB(dbURL + dbName)

//////////////////////////////
///        HELPERS
//////////////////////////////

const add = doc => db.put(doc)
const get = id => db.get(id)
const update = doc => db.put(doc)
const deleteDoc = id => db.get(id).then(doc => db.remove(doc))

module.exports = {
  add,
  get,
  update,
  deleteDoc
}
