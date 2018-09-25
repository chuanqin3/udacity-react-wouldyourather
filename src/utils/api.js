import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

// returns a single Promise that resolves when all of the promises in the iterable argument have resolved
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getTweets(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

export function saveLikeToggle (info) {
  return _saveLikeToggle(info)
}

export function saveTweet (info) {
  return _saveTweet(info)
}