import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Tweet id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// Object.keys() method returns an array of a given object's own property names
function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)