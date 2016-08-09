import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Login from './../js/Login'
import Logout from './../js/Logout'
import App from './../js/App'
import About from './../js/About'
import Dashboard from './../js/Dashboard'
import auth from './../utils/auth'

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="/about" component={About}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
        </Route>
    </Router>
), document.getElementById('app-index'))