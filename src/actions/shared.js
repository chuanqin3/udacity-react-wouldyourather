import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'guest'

// below is a thunk action creator, whose basic format is:
// function handleInitialData () {
//  return (dispatch) => {}
// }

// If the Redux Thunk middleware is enabled (which is done via the applyMiddleware() function),
// then any time your action creator returns a function instead of a Javascript object, it will
// go to the react-thunk middleware.

// If the thunk middleware sees an action, that action will be sent to the next middleware in
// line - the logger middleware. If it sees a function, the thunk middleware will call that function.

// below returns a function ---> go to react-thunk middleware
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        // Dispatch action creators. This is the only way to trigger a state change.
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}