const test = require('tape')
const testPost = require('./test-post.js')
const testGet = require('./test-get.js')
const testDelete = require('./test-delete.js')
const { merge } = require('ramda')

module.exports = (testName, path, postRequestBody, pk) => {
  return new Promise((resolve, reject) => {
    test(testName, t => {
      testPost(t, path, postRequestBody, pk)
        .then(body =>
          testGet(t, `${path}/${pk}`, merge(postRequestBody, { _id: pk }))
        )
        .then(body => testDelete(t, `${path}/${pk}`, pk))
        .then(body => resolve(body))
        .then(() => t.end())
        .catch(err => reject(err))
    })
  })
}
