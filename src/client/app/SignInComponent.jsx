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





class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.email, passwordValue : ''};
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
  } 

  render() {
    return (
      <div>
        <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" />
        <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" />
        <button onClick={this.handleSubmit}>Sign In</button>
      </div>
    );
  }

  updateEmailValue(e) {
    this.setState({
      emailValue: e.target.value
    });
  }
  
  updatePasswordValue(e) {
    this.setState({
      passwordValue: e.target.value
    });
  }
  
  handleSubmit(e) {
    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();

    var authenticationData = {
        Username : email, 
        Password : password
    };
    
    
    var authenticationDetails = new AuthenticationDetails(authenticationData);
 
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    
    var cognitoUser = new CognitoUser(userData);
    this.props.handleUserReceived(cognitoUser);
    var thisProps = this.props; // we lose this.props inside the authenticateUser function
    
    cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              thisProps.handleIdTokenReceived(result);
              thisProps.history.push('organizations');
          },
   
          onFailure: function(err) {
              alert(JSON.stringify(err));
          }
      });
    }

}

export default SignInComponent;