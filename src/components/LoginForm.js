import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import { Message } from 'semantic-ui-react'

class LoginForm extends Component {
  render() {
    const { userIds, avatarURL, username } = this.props

    return (
      <div>
        <Message warning>
          <Message.Header>You must log in to view, vote, and create polls!</Message.Header>
          <p>...but you can still see the Leader Board as a guest</p>
        </Message>
        <ul className='dashboard-list'>
          {userIds.map((id) => (
            <li key={id}>
              <UserCard id={id}/>
            </li>
          ))}
        </ul>
      </div>
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
