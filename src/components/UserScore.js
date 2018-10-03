import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'

class UserScore extends Component {
  render() {
    const {
      username, avatarURL, answeredCount, createdCount, totalScore
    } = this.props

    return (
      <Grid className="border-box" padded centered>
        <Grid.Column width={2}>
          <Image
            size='tiny'
            src={avatarURL}
            alt={`Avatar of ${username}`}
            className='avatar'
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <h5 className='userscore-name'>{username}</h5>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid.Row className='userscore-answered'>
            <p>Answered {answeredCount} polls</p>
          </Grid.Row>
          <Grid.Row className='userscore-created'>
            <p>Created {createdCount} polls</p>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column textAlign='center' width={2}>
          <Grid.Row>
            <b>Score</b>
          </Grid.Row>
          <Grid.Row className='userscore-score'>
            <h1>{totalScore}</h1>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps({ users }, { id }) {
  const username = users[id].name
  const avatarURL = users[id].avatarURL
  const answeredCount = Object.keys(users[id].answers).length
  const createdCount = users[id].questions.length
  const totalScore = answeredCount + createdCount

  return {
    username,
    avatarURL,
    answeredCount,
    createdCount,
    totalScore,
  }
}

export default connect(mapStateToProps)(UserScore)
