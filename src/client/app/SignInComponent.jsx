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
    this.state = {emailValue : props.email, 
                  passwordValue : '', 
                  buttonNormal : "btn btn-primary btn-sm",
                  buttonClicked : "dragon-hidden",
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
  } 

  render() {
      
    
    return (
      <div className="form-inline dragon-login-box">
      
      <div className="form-group">
        <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
        <span>&nbsp;</span>
      </div>
      
      <div className="form-group">
        <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
        <span>forgot password?</span>
      </div>
      
      <div className="form-group">
        <button onClick={this.handleSubmit} className={this.state.buttonNormal}>Sign In</button>
        <button className={this.state.buttonClicked}><i className='fa fa-circle-o-notch fa-spin'></i> Signing In</button>
        <br/>
        <span>&nbsp;</span>
      </div>
        <br/>
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
    this.setState({buttonClicked : this.state.buttonNormal});
    this.setState({buttonNormal : "dragon-hidden"});
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
    var myThis = this; // we lose this.props inside the authenticateUser function
    
    cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              myThis.props.handleIdTokenReceived(result);
              myThis.props.history.push('organizations');
          },
   
          onFailure: function(err) {
              myThis.setState({buttonNormal : myThis.state.buttonClicked});
              myThis.setState({buttonClicked : "dragon-hidden"});
              if (err.code === "UserNotConfirmedException") {
                myThis.props.history.push('confirmregistration');
              }
          }
      });
    }

}

export default SignInComponent;