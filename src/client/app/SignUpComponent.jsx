import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import appconfig from "./appconfig";

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
    var email = this.state.emailValue;
    var password = this.state.passwordValue;
    
    var poolData = {
      UserPoolId : '', // your user pool id here
      ClientId : '' // your app client id here
    };
    
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : '...', // your username here
        Pool : userPool
    };
    
    var attributeList = [];
     
    var dataEmail = {
        Name : 'email',
        Value : email // your email here
    };

    var attributeEmail =  new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber =  new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
     
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
     
    var cognitoUser;
    userPool.signUp('username', 'password', attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
    
    
    
    
    
    
  }

}

export default SignUpComponent;