import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import { Message } from 'semantic-ui-react'

class LoginForm extends Component {
  render() {
    let { userIds, authedUser } = this.props
    userIds = userIds.filter(each => each !== 'guest')

    return (
      <div>
        {authedUser === 'guest'
          ? <Message warning>
              <Message.Header>You must log in to view, vote, and create polls!</Message.Header>
              <p>...but you can still see the Leader Board as a guest</p>
            </Message>
          : null
        }
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

function mapStateToProps ({ users, authedUser }) {
  const userIds = Object.keys(users)

  return {
    authedUser,
    userIds,
  }
}

export default connect(mapStateToProps)(LoginForm)
