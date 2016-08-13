import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import Login from './../js/Login'
import App from './../js/App'
import Dashboard from './../js/Dashboard'
import Person from './../js/Person'
import Groundinfo from './../js/Groundinfo'
import Farm from './../js/Farm'
import Area from './../js/Area'
import Groundsearch from './../js/Groundsearch'
import Growth from './../js/Growth'
import Record from './../js/Record'
import Weather from './../js/Weather'
import Insect from './../js/Insect'
import auth from './../utils/auth'
import 'antd/dist/antd.less';
import './../less/main.less';



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
        </Route>

        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} >
            <Route path="/person" component={Person}/>
            <Route path="/groundinfo" component={Groundinfo}/>
            <Route path="/farm" component={Farm}/>
            <Route path="/area" component={Area}/>
            <Route path="/groundsearch" component={Groundsearch}/>
            <Route path="/growth" component={Growth}/>
            <Route path="/record" component={Record}/>
            <Route path="/weather" component={Weather}/>
            <Route path="/insect" component={Insect}/>
        </Route>
    </Router>
), document.getElementById('app-index'))