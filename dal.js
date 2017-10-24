const pkGen = require('./lib/build-pk')
const { prop, assoc } = require('ramda')
const {
  getBookTransformer,
  postBookTransformer
} = require('./lib/dal-mysql-transformers')
const dalHelper =
  process.env.DAL === 'mysql-dal' ? 'dal-mysql-helper' : 'dal-helper'

const { add, get, update, deleteDoc } = require(`./lib/${dalHelper}`)

const addBook = book => {
  book._id = pkGen('book', '_', book.title)
  return add(book, 'book', postBookTransformer)
}

const getBook = id => get(id, 'vbookPrices', getBookTransformer)
const updateBook = book => update(book)
const deleteBook = id => deleteDoc(id)
const addAuthor = author =>
  add(assoc('_id', pkGen('author', '_', prop('name', author)), author))
const getAuthor = id => get(id)
const updateAuthor = author => update(author)
const deleteAuthor = id => deleteDoc(id)

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
