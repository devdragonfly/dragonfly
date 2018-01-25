//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class PlayComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {unused : "not found"
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
              {JSON.stringify(this.props.dragonfly)}
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      
    );
  }

}

export default PlayComponent;