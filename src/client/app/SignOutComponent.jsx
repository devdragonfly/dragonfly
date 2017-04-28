//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";

//AWSCognito.config.region = appconfig.region;

/*
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appconfig.IdentityPoolId
});
*/


const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});





class SignOutComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.email};
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
  } 


  render() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Sign Out</button>
      </div>
    );
  }


  
  handleSubmit(e) {
    
    const email = this.state.emailValue;
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);

    
    if (cognitoUser != null) {
          cognitoUser.signOut();
        }
        
    this.props.handleIdTokenReceived('not found');
    this.props.handleUserReceived('not found');
    
    this.props.history.push('signup');
    
  }

}

export default SignOutComponent;