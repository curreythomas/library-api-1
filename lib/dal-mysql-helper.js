require('dotenv').config()
const NodeHTTPError = require('node-http-error')
const mysql = require('mysql')
const { isEmpty } = require('ramda')

function createConnection() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })
}

//tap(x => console.log('after _id', x)),

const get = (id, tableName, transformer) => {
  return new Promise((resolve, reject) => {
    const connection = createConnection()

    connection.query(
      `SELECT *
       FROM ${connection.escapeId(tableName)}
       WHERE ID = ?`,
      [id],
      function(err, data) {
        if (err) {
          return reject(err)
        }
        if (isEmpty(data)) {
          return reject(
            new NodeHTTPError(404, 'missing', {
              error: 'not_found',
              reason: 'missing',
              name: 'not_found',
              status: 404
            })
          )
        }

        if (data) {
          console.log('THE DATA IS length>>>', data, data.length)
          return resolve(transformer(data))
        }
      }
    )

    connection.end(function(err) {
      if (err) return err
    })
  })
}

module.exports = {
  get
}
