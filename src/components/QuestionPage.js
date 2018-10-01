import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Progress } from 'semantic-ui-react'

class QuestionPage extends Component {
  render() {
    const { username, optionOne, optionTwo, avatarURL } = this.props
    const totalVotesCount = optionOne.votes.length + optionTwo.votes.length

    return (
      <div>
        <h3>Would You Rather?</h3>
        <div>
          <img
            src={avatarURL}
            alt={`Avatar of ${username}`}
            className='avatar'
          />
          <h5>Posted by {username}</h5>
        </div>
        <Progress progress='value' value={optionOne.votes.length} >{optionOne.text}</Progress>
        <Progress progress='value' value={optionTwo.votes.length} >{optionTwo.text}</Progress>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const optionOne = questions[id].optionOne
  const optionTwo = questions[id].optionTwo
  const authorId = questions[id].author
  const username = users[authorId].name
  const avatarURL = users[authorId].avatarURL

  return {
    id,
    optionOne,
    optionTwo,
    username,
    avatarURL,
    // replies: !tweets[id]
    //   ? []
    //   : tweets[id].replies.sort((a, b, ) => tweets[b].timestamp - tweets[a].timestamp)

  }
}

export default connect(mapStateToProps)(QuestionPage)
