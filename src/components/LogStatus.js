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
		return (
			<div>
				{authedUser === null
					? <span>Hello, guest</span>
					: <Fragment>
							<span>Hello, {userInfo.name}</span>
							<button className='ui button toggle' onClick={this.jumpToLoginPage}>Logout</button>
						</Fragment>
				}
			</div>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	const userInfo = users[authedUser]
	// const username = users[authedUser].name

	return {
		authedUser,
		userInfo,
		// userName: typeof(users[authedUser] !== undefined) ? users[authedUser].name : "",
	}
}

export default withRouter(connect(mapStateToProps)(LogStatus))
