import React, { Component } from 'react'
import { connect } from 'react-redux'

class LogStatus extends Component {
	render() {
		console.log("log prop is ", this.props)
		return (
			<div>
				Hello, {this.props.userName}
			</div>
		)
	}
}

function mapStateToProps({ users, authedUser }) {

	return {
		authedUser,
		// userName: typeof(users[authedUser] !== undefined) ? users[authedUser].name : "",
	}
}

export default connect(mapStateToProps)(LogStatus)
