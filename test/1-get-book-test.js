const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('GET /books/:id', t => {
  request(app)
    .get('/books/book_dune')
    .expect(200)
    .expect('Content-Type', 'json')
    .end((err, res) => {
      const compareBook = {
        _id: 'book_dune',
        title: 'Dune',
        author: 'author_frank_herbert',
        type: 'book',
        publisher: 'Spice Books',
        ISBN: '12947123',
        pages: 400,
        genre: 'Fiction',
        description: 'blah',
        rating: 92,
        prices: [
          {
            type: 'paperback',
            price: 9.99
          },
          {
            type: 'hardback',
            price: 19.99
          }
        ]
      }
      const retrievedBookFromDB = compose(omit('_rev'), prop('body'))(res)
      t.same(compareBook, retrievedBookFromDB, 'Compare book')
      t.equals(prop('statusCode', res), 200, 'Status code 200?')
      t.end()
    })
})
