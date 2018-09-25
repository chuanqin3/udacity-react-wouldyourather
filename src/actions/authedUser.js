export const SET_AUTHED_USER = 'SET_AUTHED_USER'

// An action is a plain simple Object that looks like
// {type: 'ADD_TODO', item: 'BUY_MILK'}
// An action creator is a function that returns an action
export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}