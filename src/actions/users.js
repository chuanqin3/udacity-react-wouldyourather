export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_QUESTION = 'VOTE_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}