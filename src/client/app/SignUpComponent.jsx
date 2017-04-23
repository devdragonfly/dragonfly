//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
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
    this.state = {emailValue : '', passwordValue : ''};
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
    alert('Ok, it was clicked');
    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();
    
    alert(email + ' ' + password);
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];
    
    alert(JSON.stringify(userPool));
    
    var cognitoUser;
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        alert(err);
        return;
      }
    cognitoUser = result.user;
    alert('user name is ' + cognitoUser.getUsername());
    });
  }

}

export default SignUpComponent;