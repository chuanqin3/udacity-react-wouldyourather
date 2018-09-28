import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'
export const VOTE_QUESTION = 'VOTE_QUESTION'

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  }
}

export function voteQuestion ({ id, authedUser, option }) {
  return {
    type: VOTE_QUESTION,
    id,
    authedUser,
    option,
  }
}

export function handleAddTweet (text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function toggleTweet ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet (info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(toggleTweet(info))
        alert('There was an error liking the tweet. Try again.')
      })
  }
}