import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/tweets'
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

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const wordsLeft1 = 150 - text1.length
    const wordsLeft2 = 150 - text2.length

    return (
      <div>
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
          <button type='submit' className='ui button' disabled={(text1 && text2) === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// inject just dispatch and don't listen to store
export default connect()(NewQuestion)
