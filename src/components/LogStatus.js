import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

class LogStatus extends Component {
	jumpToLoginPage = (e, authedUser) => {
		// logout from current authentication. If already a guest, simply jump to login page
		const { dispatch } = this.props
		if (authedUser !== 'guest') {
			dispatch(setAuthedUser('guest'))
		}

		// jump to login page
		this.props.history.push('/login');
	}

	render() {
		const { userInfo, authedUser } = this.props

		return (
			<div className='right'>
				<a className='one-space-after'>Hello, {userInfo.name}</a>
				{authedUser !== 'guest'
					? <Button basic compact onClick={e => this.jumpToLoginPage(e, authedUser)}>Logout</Button>
					: <Button basic compact onClick={e => this.jumpToLoginPage(e, authedUser)}>Log In</Button>
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
