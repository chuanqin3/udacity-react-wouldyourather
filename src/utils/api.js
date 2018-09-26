import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from './_DATA2.js'

// returns a single Promise that resolves when all of the promises in the iterable argument have resolved
export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}