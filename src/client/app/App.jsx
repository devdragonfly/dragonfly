import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import {render} from 'react-dom';
import SignUpComponent from './SignUpComponent.jsx';
import ConfirmRegistrationComponent from './ConfirmRegistrationComponent.jsx';


class App extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={SignUpComponent} />
        <Route path='/confirmRegistration' component={ConfirmRegistrationComponent} />
      </Router>
    )
  }

/*
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={SignUpComponent} />
        <Route path='/confirmRegistration' component={ConfirmRegistrationComponent} />
      </Router>
    )
  }
*/


}

export default App;