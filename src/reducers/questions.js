import { RECEIVE_QUESTIONS, VOTE_QUESTION, ADD_QUESTION } from '../actions/questions'

// the function name 'questions' suggests that it will manipulate questions in State
export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    case VOTE_QUESTION :
      return {
				...state,
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat(action.authedUser)
					}
				}
			}
    default :
      return state
  }
}
