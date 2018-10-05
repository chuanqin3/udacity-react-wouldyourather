import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

const LogStatus = ({ authedUser, userInfo, dispatch, history }) => {
	const jumpToLoginPage = (e, authedUser) => {
		if (authedUser !== 'guest') {
			dispatch(setAuthedUser('guest'))
		}

		// jump to login page
		history.push('/login');
	}

	return (
		<div className='right'>
			<a className='one-space-after hello-user'>Hello, {userInfo.name}</a>
			{authedUser !== 'guest'
				? <Button basic compact onClick={e => jumpToLoginPage(e, authedUser)}>Logout</Button>
				: <Button basic compact onClick={e => jumpToLoginPage(e, authedUser)}>Log In</Button>
			}
		</div>
	)
}

function mapStateToProps({ users, authedUser }) {
	const userInfo = users[authedUser]

	return {
		authedUser,
		userInfo,
	}
}

export default withRouter(connect(mapStateToProps)(LogStatus))
