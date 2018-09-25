import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'

class App extends Component {
  // load the state from Store
  // this dispatch prop is provided by connect() automatically
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {/* if authedUser in the state is not fetched/updated, it will be null.
            so loading will be set to true before the state is updated */}
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

// take the authedUser from the state of Store, pass to App Component as loading
function mapStateToProps ({ authedUser }) {
  return {
    // if authedUser is null, return true; otherwise, false
    loading: authedUser === null
  }
}

// connect to the <Provider> in index.js of src folder
// dispatch is automatically provided by connect if it is missing a second argument.
// That second argument is reserved for mapDispatchToProps, which allows us to customize how we send
// actions to our reducer. Without the second argument we will still be able to use dispatch on any
// component wrapped with connect
export default connect(mapStateToProps)(App)