import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Progress, Image, Grid, Header } from 'semantic-ui-react'

const SingleQuestionDetail = ({ authedUser, username, optionOne, optionTwo, avatarURL }) => {
  if (optionOne === null || optionTwo === null) {
    return <p>This question doesn't exist. Make sure you type the correct url!</p>
  }

  const totalVotesCount = optionOne.votes.length + optionTwo.votes.length
  const optionOnePercent = Math.round((optionOne.votes.length / totalVotesCount) * 100)
  let authedUserChoice = "You would rather "
  if (optionOne.votes.indexOf(authedUser) !== -1) {
    authedUserChoice = authedUserChoice.concat(optionOne.text)
  } else if (optionTwo.votes.indexOf(authedUser) !== -1) {
    authedUserChoice = authedUserChoice.concat(optionTwo.text)
  } else {
    authedUserChoice = "You have not voted yet! Please go back to the Homepage and vote."
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
          {authedUserChoice === 'You have not voted yet! Please go back to the Homepage and vote.'
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
  const optionOne = questions[id] ? questions[id].optionOne : null
  const optionTwo = questions[id] ? questions[id].optionTwo : null
  const authorId = questions[id] ? questions[id].author : null
  const username = users[authorId] ? users[authorId].name : null
  const avatarURL = users[authorId] ? users[authorId].avatarURL : null

  return {
    id,
    authedUser,
    optionOne,
    optionTwo,
    username,
    avatarURL,
  }
}

export default connect(mapStateToProps)(SingleQuestionDetail)
