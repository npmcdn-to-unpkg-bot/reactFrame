import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import Login from './../js/Login'
import Logout from './../js/Logout'
import App from './../js/App'
import About from './../js/About'
import Dashboard from './../js/Dashboard'
import Person from './../js/Person'
import MapOne from './../js/MapOne'
import MapTwo from './../js/MapTwo'
import MapThree from './../js/MapThree'
import auth from './../utils/auth'
import 'antd/dist/antd.less';



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
            <IndexRedirect to="/login" />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />

        </Route>

        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} >
            <Route path="/person" component={Person}/>
            <Route path="/about" component={About}/>
            <Route path="/mapone" component={MapOne}/>
            <Route path="/maptwo" component={MapTwo}/>
            <Route path="/mapthree" component={MapThree}/>
        </Route>
    </Router>
), document.getElementById('app-index'))