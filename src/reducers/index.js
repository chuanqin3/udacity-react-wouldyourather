// exports our invocation to combine reducers
import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import questions from './tweets'
import { loadingBarReducer } from 'react-redux-loading'

// below is the state! It used the ES6 shorthand to define the state properties
// In State, there are 4 properties
// For example, users: users, questions: questions
export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
})