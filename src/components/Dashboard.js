import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
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
    const { questions, answeredQuestionsId, unansweredQuestionsId } = this.props
    let unansweredIdSorted = unansweredQuestionsId.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    let answeredIdSorted = answeredQuestionsId.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    return (
      <div>
        <h3 className='center'>Would You Rather?</h3>
        <span>Unanswered polls  </span><Checkbox slider label='Answered polls' onChange={this.handleViewToggle} />
        { this.state.showUnanswered ?
          <ul className='dashboard-list'>
            {unansweredIdSorted.map((id) => (
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
          </ul>
          :
          <ul className='dashboard-list'>
            {answeredIdSorted.map((id) => (
              <li key={id}>
                <Question id={id}/>
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
  const allQuestionIds = Object.keys(questions)

  return {
    questions,
    answeredQuestionsId: allQuestionIds
      .filter(each =>
        questions[each].optionOne.votes.indexOf(authedUser) !== -1 || questions[each].optionTwo.votes.indexOf(authedUser) !== -1
      ),
    unansweredQuestionsId: allQuestionIds
      .filter(each =>
        questions[each].optionOne.votes.indexOf(authedUser) === -1 && questions[each].optionTwo.votes.indexOf(authedUser) === -1
      )
  }
}

export default connect(mapStateToProps)(Dashboard)