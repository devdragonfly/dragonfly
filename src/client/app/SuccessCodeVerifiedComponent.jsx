import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class SuccessCodeVerifiedComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      

      <div className="row home-bg-outer"><div className="col-sm-12">
      <div className="home-bg-inner">
      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-4">
          <br/><br/><br/><br/>
          <div className="signUpBox">
            <h2 className="dragonfly-blue">Thank You!</h2>
            Your account creation is now complete.
            <br/><br/>
            Please sign in above with your email and password.
          </div>
          <br/><br/><br/><br/>
        </div>
        <div className="col-sm-7">
        </div>
        </div></div>
      </div></div>
      

      
    );
  }
  
}

export default SuccessCodeVerifiedComponent;