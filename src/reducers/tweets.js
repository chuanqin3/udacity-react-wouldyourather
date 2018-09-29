import { RECEIVE_QUESTIONS, VOTE_QUESTION, TOGGLE_TWEET, ADD_QUESTION } from '../actions/tweets'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      console.log(action.question)

      return {
        ...state,
        [action.question.id]: action.question
      }
    case VOTE_QUESTION :
      let optionOneOrTwo = {}
      if (action.option === "one") {
        optionOneOrTwo = {
          [action.id]: {
            ...state[action.id],
            optionOne: {
              ...state[action.id].optionOne,
              votes: state[action.id].optionOne.votes.concat([action.authedUser])
            }
          }
        }
      } else {
        optionOneOrTwo = {
          [action.id]: {
            ...state[action.id],
            optionTwo: {
              ...state[action.id].optionTwo,
              votes: state[action.id].optionTwo.votes.concat([action.authedUser])
            }
          }
        }
      }

      return {
        ...state,
        ...optionOneOrTwo,
      }
    default :
      return state
  }
}