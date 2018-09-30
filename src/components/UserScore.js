import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewQuestion from './NewQuestion'

class UserScore extends Component {
  render() {
    const {
      username, avatarURL, answeredCount, createdCount, totalScore
    } = this.props

    return (
      <div>
        <img
          src={avatarURL}
          alt={`Avatar of ${username}`}
          className='avatar'
        />
        <div>
          <span>Answered {answeredCount} polls</span>
          <span>Created {createdCount} polls</span>
        </div>
        <div>
          Score {totalScore}
        </div>
      </div>
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

  console.log(username)

  return {
    username,
    avatarURL,
    answeredCount,
    createdCount,
    totalScore,
  }
}

export default connect(mapStateToProps)(UserScore)
