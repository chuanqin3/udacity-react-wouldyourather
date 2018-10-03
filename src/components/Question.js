import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'
import { Button, Header, Grid, Image } from 'semantic-ui-react'

class QuestionList extends Component {
  handleVote = (e, id) => {
    e.preventDefault()

    const { dispatch, question } = this.props
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
      <Link to={`/questions/${id}`} className='linkable-box'>
        <Grid className='border-box' padded>
          <Grid.Row>
            <h5 className='user-asks'>{userInfo.name} asks:</h5>
          </Grid.Row>
          <Grid.Row className='user-image-poll'>
            <Grid.Column width={3}>
              <Image
                size='tiny'
                src={userInfo.avatarURL}
                alt={`Avatar of ${userInfo.name}`}
                className='avatar'
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Header as='h5'>Would you rather...</Header>
              <Button active={answeredByAuthedUserOrNotOne} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => this.handleVote(e, id)} name="optionOne">
                {optionOne.text}
              </Button>
              <Button active={answeredByAuthedUserOrNotTwo} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => this.handleVote(e, id)} name="optionTwo">
                {optionTwo.text}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Link>
    )
  }
}

// need to grab authedUser, users, tweets from the state of Store
// { id } will be passed from Dashboard as a prop
// use the id from Dashboard to query the relevant tweets from the state of Store
function mapStateToProps ({ users, questions}, { id }) {
  const question = questions[id]
  const userInfo = users[question.author]

  return {
    userInfo,
    question,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList))
