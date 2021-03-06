import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    text1: '',
    text2: '',
    toHome: false,
  }

  handleChange1 = (e) => {
    const text1 = e.target.value

    this.setState(() => ({
      text1
    }))
  }

  handleChange2 = (e) => {
    const text2 = e.target.value

    this.setState(() => ({
      text2
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text1, text2 } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(text1, text2))

    this.setState(() => ({
      text1: '',
      text2: '',
      toHome: true,
    }))
  }

  render() {
    const { text1, text2, toHome } = this.state
    const { authedUser, location } = this.props

    if (authedUser === 'guest') {
      return <Redirect
      to={{
        pathname: '/login', // where you want to redirect the user to
        state: { from: location.pathname } // save the location where you came from before going to '/login'. accessible in props
      }}
    />
    }

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const wordsLeft1 = 150 - text1.length
    const wordsLeft2 = 150 - text2.length

    return (
      <div>
        <h3 className='center'>Compose a new Would You Rather poll</h3>
        <form className='ui form' onSubmit={this.handleSubmit}>
          <div className='field'>
            <label>First Option</label>
            <input placeholder='First Option' onChange={this.handleChange1} maxLength={150}/>
          </div>
          {wordsLeft1 <= 20 && (
            <div className='tweet-length'>
              You can input {wordsLeft1} more letters
            </div>
          )}
          <div className='field'>
            <label>Second Option</label>
            <input placeholder='Last Option' onChange={this.handleChange2} maxLength={150} />
          </div>
          {wordsLeft2 <= 20 && (
            <div className='tweet-length'>
              You can input {wordsLeft2} more letters
            </div>
          )}
          <button type='submit' className='ui button' disabled={text1 === '' || text2 === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

// inject just dispatch and don't listen to store
export default connect(mapStateToProps)(NewQuestion)
