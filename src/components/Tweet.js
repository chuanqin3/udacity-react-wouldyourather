import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/_DATA2'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'
import { Progress } from 'semantic-ui-react'

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()
    // handle like events
    // const { dispatch, tweet, authedUser } = this.props

    // dispatch(handleToggleTweet({
    //   id: tweet.id,
    //   hasLiked: tweet.hasLiked,
    //   authedUser
    // }))
  }

  // toParent = (e, id) => {
  //   e.preventDefault()
  //   // todo: redirect to parent
  //   this.props.history.push(`/question/${id}`)
  // }

  render() {
    const { question, user } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    console.log("hey!", this.props)

    // destructing the tweet Object
    const {
      author, timestamp, id, optionOne, optionTwo
    } = question

    console.log("kaka! ", optionOne)

    return (
      <div>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <div>
          <span>Would you rather?</span>
          <div>
            <button class='ui button' role='button'>
              {optionOne.text}
            </button>
            <button class='ui button' role='button'>
              {optionTwo.text}
            </button>
          </div>
          <Progress progress='value' value={optionOne.votes.length} />
        </div>
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
  console.log("momo! ", question)
  const user = users[question.author]
  console.log("wawa! ", user)

  return {
    authedUser,
    user,
    question,
    // question: question
    //   ? formatQuestion(optionOneText, optionTwoText, author)
    //   : null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))