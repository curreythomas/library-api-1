require('dotenv').config()
const port = process.env.PORT || 4000
const {
  getBook,
  deleteBook,
  addBook,
  updateBook,
  getAuthor,
  deleteAuthor,
  addAuthor,
  updateAuthor
} = require('./dal.js')
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/check-required-fields.js')
const {
  not,
  isEmpty,
  join,
  omit,
  merge,
  prop,
  __,
  compose,
  path
} = require('ramda')

app.use(bodyParser.json())

app.post('/authors', function(req, res, next) {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'author' }),
    prop('body')
  )(req)

  const missingFields = checkRequiredFields(
    ['name', 'placeOfBirth', 'birthDate'],
    body
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(400, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }

  addAuthor(body, (err, result) => {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(201).send(result)
  })
})

app.get('/authors/:id', (req, res, next) =>
  getAuthor(path(['params', 'id'], req), (err, doc) => {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
)

app.put('/authors/:id', (req, res, next) => {
  if (isEmpty(prop('body'), req)) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }
  const missingFields = checkRequiredFields(
    ['_id', '_rev', 'placeOfBirth', 'birthDate', 'name'],
    prop('body', req)
  )
  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(401, `Missing required fields: ${join(' ', missingFields)}`)
    )
  }
  updateAuthor(prop('body', req), (err, result) => {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(result)
  })
})

app.delete('/authors/:id', (req, res, next) => {
  deleteAuthor(path(['params', 'id'], req), (err, result) => {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(result)
  })
})

app.post('/books', function(req, res, next) {
  // check to make sure the request body exists
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }
  // force the type prop to be 'book'
  //var body = merge(prop('body', req), {type: 'book'})

  // omit an _id or _rev prop if present
  //body = omit(['_id', '_rev'], body)

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'book' }),
    prop('body')
  )(req)

  // check to make sure required fields are present in the request body
  const missingFields = checkRequiredFields(
    ['title', 'author', 'ISBN', 'genre', 'description'],
    body
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  addBook(body, function(err, addResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(201).send(addResult)
  })
})

// get a book   GET /books/id
app.get('/books/:id', function(req, res, next) {
  getBook(req.params.id, function(err, doc) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(doc)
  })
})

app.put('/books/:id', function(req, res, next) {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }

  const missingFields = checkRequiredFields(
    ['_id', '_rev', 'type', 'title', 'author', 'ISBN', 'genre', 'description'],
    prop('body', req)
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  updateBook(prop('body', req), function(err, updateResult) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(updateResult)
  })
})

app.delete('/books/:id', function(req, res, next) {
  deleteBook(req.params.id, function(err, deleteResponse) {
    if (err) return next(new HTTPError(err.status, err.message))
    res.status(200).send(deleteResponse)
  })
})

////////////////////////
//  ERROR HANDLER
///////////////////////
app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, ' ', 'error ', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('API is up on port', port))
