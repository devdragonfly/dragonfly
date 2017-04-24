import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './Main.jsx';
import SignInComponent from './SignInComponent.jsx';
import SignUpComponent from './SignUpComponent.jsx';
import OrganizationsComponent from './OrganizationsComponent.jsx';
import ConfirmRegistrationComponent from './ConfirmRegistrationComponent.jsx';

class Home extends Component {
    render(){
        return (<h1>Dragonfly</h1>);
    }
}

render(
    <Router>
        <Route path="/" component={Main} history={browserHistory}>
            <IndexRoute component={Home} />
            <Route path="" component={Home}/>
            <Route path="signin" component={SignInComponent}/>
            <Route path="signup" component={SignUpComponent}/>
            <Route path="organizations" component={OrganizationsComponent}/>
            <Route path="confirmregistration" component={ConfirmRegistrationComponent}/>
        </Route>
    </Router>,
    document.getElementById('container')
);