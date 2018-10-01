import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'

class UserScore extends Component {
  render() {
    const {
      username, avatarURL, answeredCount, createdCount, totalScore
    } = this.props

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              size='tiny'
              src={avatarURL}
              alt={`Avatar of ${username}`}
              className='avatar'
            />
          </Grid.Column>
          <Grid.Column width={2}>
            {username}
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid.Row>
              <span>Answered {answeredCount} polls</span>
            </Grid.Row>
            <Grid.Row>
              <span>Created {createdCount} polls</span>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={2}>
            Score {totalScore}
          </Grid.Column>
        </Grid.Row>
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

  // const avatarURL = userId.map(each => {
  //   return users[each].avatarURL
  // })

  // const answeredCount = userId.map(each => {
  //   return Object.keys(users[each].answers).length
  // })

  // const createdCount = userId.map(each => {
  //   return users[each].questions.length
  // })

  // const totalScore = userId.map(each => {
  //   return Object.keys(users[each].answers).length + users[each].questions.length
  // })

  // let userScore = {};
  // userId.forEach((id, count) => userScore[id] = {
  //   username: username[count],
  //   avatarURL: avatarURL[count],
  //   answeredCount: answeredCount[count],
  //   createdCount: createdCount[count],
  //   totalScore: totalScore[count],
  // });

  return {
    username,
    avatarURL,
    answeredCount,
    createdCount,
    totalScore,
  }
}

export default connect(mapStateToProps)(UserScore)
