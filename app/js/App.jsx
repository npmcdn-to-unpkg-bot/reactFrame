import React from 'react'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'
import auth from '../utils/auth.js'


const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
        <div>
          <ul>
            <li>
              {this.state.loggedIn ? (
                  <Link to="/logout">Log out</Link>
              ) : (
                  <Link to="/login">Sign in</Link>
              )}
            </li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
          </ul>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
    )
  }
})

export default App
