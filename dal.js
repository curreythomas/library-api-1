require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL

console.log('db is' + dbURL + dbName)

const db = new PouchDB(dbURL + dbName)

const addBook = (book, callback) => {
  //build an _id prop that takes the title of the book and does the following:
  // such as   "title": "A Brave New World"
  // transform it into "book_brave_new_world"
  //  require ramda
  //  lower case
  //  strip off the the A or The if its the first word
  //  concatenate the word "book_"
  //  replace the spaces with underscores _

  book._id = pkGen('book', '_', book.title)

  add(book, callback)
  //add(merge(book, {_id: pkGen("book", "_", prop('title', book)}), callback)
}
const getBook = (id, callback) => get(id, callback)
const updateBook = (book, callback) => update(book, callback)
const deleteBook = (id, callback) => deleteDoc(id, callback)

//////////////////////////////
///        HELPERS
//////////////////////////////
function add(doc, callback) {
  db.put(doc, function(err, data) {
    if (err) return callback(err)
    callback(null, data)
  })
}

function get(id, callback) {
  db.get(id, function(err, data) {
    if (err) return callback(err)
    callback(null, data)
  })
}

function update(doc, callback) {
  db.put(doc, function(err, data) {
    if (err) return callback(err)
    callback(null, data)
  })
}

function deleteDoc(id, callback) {
  db.get(id, function(err, data) {
    if (err) return callback(err)

    db.remove(data, function(err, removedResult) {
      if (err) return callback(err)
      callback(null, removedResult)
    })
  })
}

const dal = {
  addBook,
  getBook,
  updateBook,
  deleteBook
}

module.exports = dal
