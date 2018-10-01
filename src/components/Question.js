import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class QuestionList extends Component {
  handleVote = (e, id) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props
    let option = e.target.name;

    dispatch(handleVoteQuestion({
      qid: question.id,
      answer: option,
    }))

    // todo: redirect to poll detail page
    this.props.history.push(`/questions/${id}`)
  }

  render() {
    const { question, userInfo, authedUser } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    // destructing the tweet Object
    const { id, optionOne, optionTwo } = question
    const answeredByAuthedUserOrNot = (optionOne.votes.indexOf(authedUser) + optionTwo.votes.indexOf(authedUser)) === -2 ? false : true
    const answeredByAuthedUserOrNotOne = optionOne.votes.indexOf(authedUser) === -1 ? false : true
    const answeredByAuthedUserOrNotTwo = optionTwo.votes.indexOf(authedUser) === -1 ? false : true

    return (
      <Link to={`/questions/${id}`}>
        <img
          src={userInfo.avatarURL}
          alt={`Avatar of ${userInfo.name}`}
          className='avatar'
        />
        <span>Would you rather?</span>
        <div>
          <Button active={answeredByAuthedUserOrNotOne} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => this.handleVote(e, id)} name="optionOne">
            {optionOne.text}
          </Button>
          <Button active={answeredByAuthedUserOrNotTwo} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => this.handleVote(e, id)} name="optionTwo">
            {optionTwo.text}
          </Button>
        </div>
      </Link>
    )
  }
}

// need to grab authedUser, users, tweets from the state of Store
// { id } will be passed from Dashboard as a prop
// use the id from Dashboard to query the relevant tweets from the state of Store
function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const userInfo = users[question.author]

  return {
    authedUser,
    userInfo,
    question,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList))