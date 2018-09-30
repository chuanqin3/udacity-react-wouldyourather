import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
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

export function handleAddQuestion (text1, text2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: text1,
      optionTwoText: text2,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

// export function handleSaveQuestionAnswer () {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()

//     dispatch(showLoading())

//     return saveQuestionAnswer({
//       authedUser,
//       qid,
//       answer,
//     })
//   }
// }