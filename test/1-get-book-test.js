const test = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { omit, compose, prop } = require('ramda')

test('GET /books/:id', t => {
  request(app)
    .get('/books/book_confederacy_of_dunces')
    .expect(200)
    .expect('Content-Type', 'json')
    .end((err, res) => {

      const compareBook = {
  _id: "book_confederacy_of_dunces",
  title: "A Confederacy of Dunces",
  author: "author_john_kennedy_otoole",
  type: "book",
  publisher: "Avon Books",
  ISBN: "31947224",
  pages: 321,
  genre: "Fiction",
  description: "A Confederacy of Dunces presents the misadventures of Ignatius J. Reilly, a modern Don Quixote. Ignatius is a behemoth of fat and flatulence, with a gargantuan frame, bushy black moustache, green hunting cap, and blue and yellow eyes that look down on the modern era--and particularly on anything commerical. He views materialistic comforts as offenses against taste and decency, things that demonstrate a lack of theology and geometry.",
  prices: [
    {
      "type": "paperback",
      "price": 6.99
    },
    {
      "type": "hardback",
      "price": 12.99
    },
    {
      "type": "audio",
      "price": 19.99
    }
  ]}
      const retrievedBookFromDB = compose(omit('_rev'), prop('body'))(res)
      t.same(compareBook, retrievedBookFromDB, 'Compare book')
      t.equals(prop('statusCode', res), 200, 'Status code 200?')
      t.end()
    })
})
