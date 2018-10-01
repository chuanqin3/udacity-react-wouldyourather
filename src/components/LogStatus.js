import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Header, Button, Popup, Grid, Image, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class LogStatus extends Component {
	jumpToLoginPage = () => {
		// logout from current authentication. Change authedUser to null

		// jump to login page
		this.props.history.push('/login');
	}

	render() {
		const { userInfo, authedUser } = this.props
		console.log(authedUser)
		return (
			<div className='right'>
				<span>Hello, {userInfo.name}</span>
				{authedUser !== 'guest'
					? <Button basic compact onClick={this.jumpToLoginPage}>Logout</Button>
					: <Button basic compact onClick={this.jumpToLoginPage}>Log In</Button>
				}
			</div>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	const userInfo = users[authedUser]

	return {
		authedUser,
		userInfo,
	}
}

export default withRouter(connect(mapStateToProps)(LogStatus))
