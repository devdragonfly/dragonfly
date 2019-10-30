import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class SuccessCodeVerifiedComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (



      <div className="row confirm-sign-up-container justify-content-center">

        <div className="col-12 col-lg-10">
          
          <div className="signUpBox">
            <h2 className="dragonfly-blue">Thank You!</h2>
            <p className="sign-up-confirm-info-text mar-text-split">Your account creation is now complete.</p>

            <p className="sign-up-confirm-info-text">Please sign in above with your email and password.</p>
          </div>

        </div>

      </div>




    );
  }

}

export default SuccessCodeVerifiedComponent;