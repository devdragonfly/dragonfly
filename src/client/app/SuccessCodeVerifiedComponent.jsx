import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class SuccessCodeVerifiedComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      
      <div className="row">
        <div className="col-sm-6">

        </div>
        <div className="col-sm-6">
            <h2>Thank You!</h2>
            Your account creation is now complete.
            <br/><br/>
            Please sign in above with your email and password.
        </div>
      </div>
      
    );
  }
  
}

export default SuccessCodeVerifiedComponent;