import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
  render() {
    const { authedUser } = this.props
    if (authedUser === 'guest') {
      return <Redirect to='/login' />
    }

    return (
      <div >
        <h3 className='center'>Leader Board</h3>
        <ul className='dashboard-list'>
          {this.props.userId.map((id) => (
            <li key={id}>
              <UserScore id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const userId = Object.keys(users).filter(each => each !== 'guest')

  const totalScore = userId.map(each => {
    return Object.keys(users[each].answers).length + users[each].questions.length
  })

  // create a sorting object
  let userScore = {};
  userId.forEach((id, count) => userScore[id] = totalScore[count]);

  // sort the user on leaderboard based on their total score
  userId.sort((a,b) => userScore[b] - userScore[a])

  return {
    authedUser,
    userId,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
