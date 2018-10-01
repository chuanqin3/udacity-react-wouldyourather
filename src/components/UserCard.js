import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Button } from 'semantic-ui-react'

class UserCard extends Component {
  render() {
    const { userInfo } = this.props
    const avatarURL = userInfo.avatarURL
    const username = userInfo.name

    return (
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={3}>
            <Image
                size='tiny'
                src={avatarURL}
                alt={`Avatar of ${username}`}
                className='avatar'
              />
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid.Row>
              {username}
            </Grid.Row>
            <Button>Log in as this user</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapStateToProps ({ users }, props) {
  const id = props.id

  return {
    userInfo: users[id],
  }
}

export default connect(mapStateToProps)(UserCard)
