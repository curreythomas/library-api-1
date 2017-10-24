const {
  compose,
  assoc,
  dissoc,
  prop,
  head,
  tap,
  map,
  pick,
  omit,
  isNil
} = require('ramda')

function postBookTransformer(book) {
  const authorID = prop('author', book)

  return compose(
    omit(['prices', 'type', '_id', 'author']),
    assoc('authorID', authorID)
  )(book)
}

function getBookTransformer(arrBooks) {
  const getFirstBook = head(arrBooks)
  const books = compose(isNil, prop('price'), head)(arrBooks)
    ? []
    : map(book => pick(['type', 'price'], book), arrBooks)

  return compose(
    assoc('type', 'book'),
    assoc('prices', books),
    omit(['bookPriceID', 'bookPricebookID', 'type']),
    dissoc('authorID'),
    assoc('author', prop('authorID', getFirstBook)),
    assoc('_rev', null),
    dissoc('ID'),
    assoc('_id', prop('ID', getFirstBook))
  )(getFirstBook)
}

module.exports = {
  getBookTransformer,
  postBookTransformer
}
