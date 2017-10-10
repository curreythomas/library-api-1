const test = require ('tape')
const request = require

test('POST /books', t => {
  const bookWereAdding = {

    request(app)
    .post('/books')
    .send(bookWereAdding)
    .expect(201)
    expect('Content-Type': /json/)
    .end((err, res) => {
      const addedBook = res.body
      const status = res.statusCode
      const bookID = addedBook.id
      const bookOK = addedBook.ok

t.equals(status, 201, 'Status Code 201?')
t.equals(bookOK, true, 'ok is true?')

    })
  })


  const bookWereAdding = {
    "_id": "book_bugs_life",
  "title": "A Bugs Life",
  "author": "author_aldous_huxley",
  "publisher": "Penguin Books",
  "ISBN": "12947283",
  "pages": 254,
  "genre": "Fiction",
  "description": "blah",
  "rating": 95,
  "prices": [
    {
      "type": "paperback",
      "price": 9.99
    },
    {
      "type": "hardback",
      "price": 19.99
    },
    {
      "type": "audio",
      "price": 19.99

  }
})
