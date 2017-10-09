require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const dbName = process.env.COUCH_DATABASE
const dbURL = process.env.COUCH_URL
const { prop, assoc } = require('ramda')
const {add,get,update,deleteDoc} = require('./lib/dal-helper')

console.log('db is' + dbURL + dbName)
const db = new PouchDB(dbURL + dbName)
const addBook = (book, callback) => {
    book._id = pkGen('book', '_', book.title)
    add(book, callback)
}
const getBook = (id, callback) => get(id, callback)
const updateBook = (book, callback) => update(book, callback)
const deleteBook = (id, callback) => deleteDoc(id, callback)

const addAuthor = (author, callback) =>
  add(
    assoc('_id', pkGen('author', '_', prop('name', author)), author),
    callback
  )
const getAuthor = (id, callback) => get(id, callback)
const updateAuthor = (author, callback) => update(author, callback)
const deleteAuthor = (id, callback) => deleteDoc(id, callback)
const dal = {
  addBook,
  getBook,
  updateBook,
  deleteBook,
  addAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor
}
module.exports = dal
