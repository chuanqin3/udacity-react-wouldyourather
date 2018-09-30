import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore'

class LeaderBoard extends Component {
  render() {
    console.log("leaderboard prop is ", this.props)
    return (
      <div>
        <h3>Leaderboard</h3>
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

function mapStateToProps({ users }) {
  const userId = Object.keys(users)

  const totalScore = userId.map(each => {
    return Object.keys(users[each].answers).length + users[each].questions.length
  })

  let userScore = {};
  userId.forEach((id, count) => userScore[id] = totalScore[count]);

  console.log(userScore)
  console.log(userScore["sarahedo"])

  // sort the user on leaderboard based on their total score
  userId.sort((a,b) => userScore[b] - userScore[a])

  return {
    userId,
  }
}

export default connect(mapStateToProps)(LeaderBoard)