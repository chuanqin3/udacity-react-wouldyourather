import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Header, Grid, Image } from 'semantic-ui-react'

const QuestionList = ({ question, userInfo, location }) => {
  if (question === null) {
    alert("This question doesn't exist. You will be redirected to Login Page")
    return <Redirect
    to={{
      pathname: '/login', // where you want to redirect the user to
      state: { from: location.pathname } // save the location where you came from before going to '/login'. accessible in props
    }}
  />
  }

  // destructing the tweet Object
  const { id, optionOne, optionTwo } = question

  return (
    <Link to={`/questions/${id}`} className='linkable-box'>
      <Grid className='border-box' padded>
        <Grid.Row>
          <h5 className='user-asks'>{userInfo.name} asks:</h5>
        </Grid.Row>
        <Grid.Row className='user-image-poll'>
          <Grid.Column width={3}>
            <Image
              size='tiny'
              src={userInfo.avatarURL}
              alt={`Avatar of ${userInfo.name}`}
              className='avatar'
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as='h5'>Would you rather...</Header>
            <p>{optionOne.text} ?</p>
            <p>or {optionTwo.text} ?</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Link>
  )
}

// need to grab authedUser, users, tweets from the state of Store
// { id } will be passed from Dashboard as a prop
// use the id from Dashboard to query the relevant tweets from the state of Store
function mapStateToProps ({ users, questions}, { id }) {
  const question = questions[id]
  const userInfo = users[question.author]

  return {
    userInfo,
    question,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList))
