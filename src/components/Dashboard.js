import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import { Checkbox } from 'semantic-ui-react'

class Dashboard extends Component {
  state = {
    showUnanswered: true,
  }

  handleViewToggle = () => {
    let boolean = this.state.showUnanswered === true ? false : true
    this.setState(
      {showUnanswered: boolean},
    )
  }

  render() {
    return (
      <div>
        <h3 className='center'>Would You Rather?</h3>
        <span>Unanswered polls  </span><Checkbox slider label='Answered polls' onChange={this.handleViewToggle} />
        { this.state.showUnanswered ?
          <ul className='dashboard-list'>
            {this.props.unansweredQuestionsId.map((id) => (
              <li key={id}>
                <QuestionList id={id}/>
              </li>
            ))}
          </ul>
          :
          <ul className='dashboard-list'>
            {this.props.answeredQuestionsId.map((id) => (
              <li key={id}>
                <QuestionList id={id}/>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

// Object.keys() method returns an array of a given object's own property names
function mapStateToProps ({ authedUser, questions }) {
  // const answeredQuestionsId: Object.keys(questions).filter(e => e.optionOne.length === 0 && e.optionOne.length === 0)

  return {
    answeredQuestionsId: Object.keys(questions)
      .filter(each =>
        questions[each].optionOne.votes.indexOf(authedUser) !== -1 || questions[each].optionTwo.votes.indexOf(authedUser) !== -1
      )
      .sort((a,b) => questions[b].timestamp - questions[a].timestap),
    unansweredQuestionsId: Object.keys(questions)
      .filter(each =>
        questions[each].optionOne.votes.indexOf(authedUser) === -1 && questions[each].optionTwo.votes.indexOf(authedUser) === -1
      )
      .sort((a,b) => questions[b].timestamp - questions[a].timestap),
    allQuestionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)