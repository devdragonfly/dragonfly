//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
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





class SignUpComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.user.username, passwordValue : ''};
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        EMAIL<br/>
        <input value={this.state.emailValue} onChange={this.updateEmailValue}/><br/>
        PASSWORD<br/>
        <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue}/><br/>
        <button onClick={this.handleSubmit}>Alert Value</button>
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
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];
    
    
    var cognitoUser;
    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          alert(err);
          return;
        }
      cognitoUser = result.user;
      this.props.handleUserReceived(cognitoUser);
      this.props.history.push('confirmregistration');
    });
  }

}

export default SignUpComponent;