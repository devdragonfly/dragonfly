//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";


//Config.region = appconfig.region;

/*
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appconfig.IdentityPoolId
});
*/


const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});





class ConfirmRegistrationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.user.username, codeValue : ''};
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updateCodeValue = this.updateCodeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        EMAIL<br/>
        <input value={this.state.emailValue} onChange={this.updateEmailValue}/><br/>
        CODE<br/>
        <input value={this.state.codeValue} onChange={this.updateCodeValue}/><br/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
  
  updateEmailValue(e) {
    this.setState({
      emailValue: e.target.value
    });
  }

  updateCodeValue(e) {
    this.setState({
      codeValue: e.target.value
    });
  }
  
  
  handleSubmit(e) {
    const email = this.state.emailValue.trim();
    const code = this.state.codeValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    
    cognitoUser.confirmRegistration(code, true, function(err, result) {
          if (err) {
          alert(err);
          return;
        }
        
          this.props.history.push('organizations');
    });
    
    
  }
}

export default ConfirmRegistrationComponent;