const {
  compose,
  assoc,
  dissoc,
  prop,
  head,
  tap,
  map,
  pick,
  omit
} = require('ramda')

function transformBook(arrBooks) {
  // incoming book object.
  // 2) rename ID to _id
  //R.dissoc('b', { a: 1, b: 2, c: 3 })
  // R.assoc('c', 3, { a: 1, b: 2 })

  // 3) add _rev with null or empty string
  // 4) Add a key of "type" with a value of "book"
  // 5) renamed authorID to author
  // 6) Add prices as a key and fill it with an array.  TOUGH!
  const getFirstBook = head(arrBooks)

  return compose(
    assoc('type', 'book'),
    assoc('prices', map(book => pick(['type', 'price'], book), arrBooks)),
    omit(['bookPriceID', 'bookPricebookID', 'type', 'price']),
    dissoc('authorID'),
    assoc('author', prop('authorID', getFirstBook)),
    assoc('_rev', null),
    dissoc('ID'),
    assoc('_id', prop('ID', getFirstBook))
  )(getFirstBook)
}

module.exports = {
  transformBook
}
