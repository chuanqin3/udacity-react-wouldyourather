import { RECEIVE_QUESTIONS, VOTE_QUESTION, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case TOGGLE_TWEET :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET :
      const { tweet } = action

      let replyingTo = {}
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo,
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