import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions'
import { withRouter, Redirect } from 'react-router-dom'
import { Progress, Image, Grid, Header, Button } from 'semantic-ui-react'

const SingleQuestionDetail = ({ authedUser, username, optionOne, optionTwo, avatarURL, question, id, dispatch, history }) => {
  if (question === null || optionOne === null || optionTwo === null ) {
    alert("The url you inputed is invalid. You will be redirected to Login page.")
    return <Redirect to='/login' />
  }

  if (authedUser === 'guest') {
    alert("You are not logged. You will be redirected to Login Page")
    return <Redirect to='/login' />
  }

  const answeredByAuthedUserOrNot = (optionOne.votes.indexOf(authedUser) + optionTwo.votes.indexOf(authedUser)) === -2 ? false : true
  const answeredByAuthedUserOrNotOne = optionOne.votes.indexOf(authedUser) === -1 ? false : true
  const answeredByAuthedUserOrNotTwo = optionTwo.votes.indexOf(authedUser) === -1 ? false : true
  const totalVotesCount = optionOne.votes.length + optionTwo.votes.length
  const optionOnePercent = Math.round((optionOne.votes.length / totalVotesCount) * 100)

  let authedUserChoice = "You would rather "
  if (optionOne.votes.indexOf(authedUser) !== -1) {
    authedUserChoice = authedUserChoice.concat(optionOne.text)
  } else if (optionTwo.votes.indexOf(authedUser) !== -1) {
    authedUserChoice = authedUserChoice.concat(optionTwo.text)
  } else {
    authedUserChoice = "You have not voted yet! Please vote now by clicking one of the buttons below. You have only one chance!"
  }

  const handleVote = (e, id) => {
    e.preventDefault()

    let option = e.target.name;

    dispatch(handleVoteQuestion({
      qid: question.id,
      answer: option,
    }))

    // todo: redirect to poll detail page
    history.push(`/questions/${id}`)
  }

  return (
    <Grid>
      <Grid.Row className='q-detail-title'>
        <Header as='h3'>Would You Rather?</Header>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image
            size='tiny'
            src={avatarURL}
            alt={`Avatar of ${username}`}
            className='avatar q-detail-avatar'
          />
          <Header as='h5'>Posted by {username}</Header>
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid.Row className='user-choice'>
            <span>{authedUserChoice}</span>
          </Grid.Row>
              <Button active={answeredByAuthedUserOrNotOne} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => handleVote(e, id)} name="optionOne">
                {optionOne.text}
              </Button>
              <Button active={answeredByAuthedUserOrNotTwo} disabled={answeredByAuthedUserOrNot} className='ui button toggle' onClick={e => handleVote(e, id)} name="optionTwo">
                {optionTwo.text}
              </Button>
          {authedUserChoice === 'You have not voted yet! Please vote now by clicking one of the buttons below. You have only one chance!'
            ? null
            : <Fragment>
                <Grid.Row>
                  <span>Below bar shows how many answerers rather {optionOne.text}...</span>
                </Grid.Row>
                <Grid.Row>
                  <Progress percent={optionOnePercent} progress>
                    <p>
                      Out of {totalVotesCount} people who answered, &ensp;
                      {optionOne.votes.length} rather {optionOne.text}, &ensp;
                      {optionTwo.votes.length} rather {optionTwo.text}
                    </p>
                  </Progress>
                </Grid.Row>
              </Fragment>
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const authorId = questions[id] ? questions[id].author : null

  return {
    id,
    question,
    authedUser,
    optionOne: question
      ? questions[id].optionOne
      : null,
    optionTwo: question
      ? questions[id].optionTwo
      : null,
    username: users[authorId]
      ? users[authorId].name
      : null,
    avatarURL: users[authorId]
      ? users[authorId].avatarURL
      : null,
  }
}

export default withRouter(connect(mapStateToProps)(SingleQuestionDetail))
