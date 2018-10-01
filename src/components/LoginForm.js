import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class LoginForm extends Component {
  render() {
    const { userIds, avatarURL, username } = this.props

    return (
      <ul className='dashboard-list'>
        {userIds.map((id) => (
          <li key={id}>
            <UserCard id={id}/>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({ users }) {
  const userIds = Object.keys(users)

  return {
    userIds,
    avatarURL: userIds.map(each => users[each].avatarURL),
    username: userIds.map(each => users[each].name),
  }
}

export default connect(mapStateToProps)(LoginForm)
