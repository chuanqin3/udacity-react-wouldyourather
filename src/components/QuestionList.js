import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class QuestionList extends Component {
  handleVote = (e, id) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props
    let option = e.target.name;

    dispatch(voteQuestion({
      option,
      authedUser,
      id: question.id
    }))

    // todo: redirect to poll detail page
    this.props.history.push(`/questions/${id}`)
  }

  render() {
    const { question, user } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    // destructing the tweet Object
    const {
      author, timestamp, id, optionOne, optionTwo
    } = question

    return (
      <div>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <Link to={`/questions/${id}`}>
          <span>Would you rather?</span>
          <div>
            <button className='ui button toggle' onClick={e => this.handleVote(e, id)} name="one">
              {optionOne.text}
            </button>
            <button className='ui button toggle' onClick={e => this.handleVote(e, id)} name="two">
              {optionTwo.text}
            </button>
          </div>
        </Link>
      </div>
      // <Link to={`/tweet/${id}`} className='tweet'>
        // <img
        //   src={users.avatarURL}
        //   alt={`Avatar of ${users.name}`}
        //   className='avatar'
        // />
      //   <div className='tweet-info'>
      //     <div>
      //       <span>{name}</span>
      //       <div>{formatDate(timestamp)}</div>
      //       {parent && (
      //         <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
      //           Replying to @{parent.author}
      //         </button>
      //       )}
      //       <p>{text}</p>
      //     </div>
      //     <div className='tweet-icons'>
      //       <TiArrowBackOutline className='tweet-icon' />
      //       <span>{replies !== 0 && replies}</span>
      //       <button className='heart-button' onClick={this.handleLike}>
      //         {hasLiked === true
      //           ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
      //           : <TiHeartOutline className='tweet-icon' />}
      //       </button>
      //       <span>{likes !== 0 && likes}</span>
      //     </div>
      //   </div>
      // </Link>
    )
  }
}

// need to grab authedUser, users, tweets from the state of Store
// { id } will be passed from Dashboard as a prop
// use the id from Dashboard to query the relevant tweets from the state of Store
function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const user = users[question.author]

  return {
    authedUser,
    user,
    question,
    // question: question
    //   ? formatQuestion(optionOneText, optionTwoText, author)
    //   : null
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList))