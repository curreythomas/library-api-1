const tape = require('tape')
const request = require('supertest')
const app = require('../app.js')
const { prop } = require('ramda')

tape('TESTING GET /', t => {
  request(app)
    .get('/')
    .end((err, res) => {
      t.plan(2)
      t.equals(prop('text', res), 'The librarian welcomes you, shhhh.')
      t.equals(prop('statusCode', res), 200)
      t.end()
    })
})
