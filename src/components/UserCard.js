import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Button } from 'semantic-ui-react'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'


const UserCard = ({ dispatch, userInfo, history, location }) => {
  // if the previous page is available, get `from` from it; it not, go to homepage
  const { from } = location.state || { from: '/' };

  const logInUser = (e, id) => {
    dispatch(setAuthedUser(id))

    // push to this 'from' path instead
		history.push(from);
  }

    const avatarURL = userInfo.avatarURL
    const username = userInfo.name
    const userId = userInfo.id

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
          <Button onClick={e => logInUser(e, userId)}>Log in as this user</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function mapStateToProps ({ users }, props) {
  const id = props.id

  return {
    userInfo: users[id],
  }
}

export default withRouter(connect(mapStateToProps)(UserCard))
