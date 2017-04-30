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



const buttonClassName = "btn btn-primary btn-sm";

class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {emailValue : props.email, 
                  passwordValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
                  
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
  } 

  render() {

    
    return (
      <div className="dragon-login-box">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
            <span>&nbsp;</span>
          </div>
          
          <div className="form-group">
            <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
            <Link to={`accessaccount`}>forgot password?</Link>
          </div>
          
          <div className="form-group">
            <input type="submit" className={this.state.buttonRestClassName} value="Sign In" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Signing In</div>
            <br/>
            <span>&nbsp;</span>
          </div>
            <br/>
            
        </form>
      </div>
    );
  }
  

  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
    }
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
    e.preventDefault();
    this.showClickedButtonState(true);
    
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
              myThis.showClickedButtonState(false);
              myThis.props.handleIdTokenReceived(result);
              myThis.props.history.push('organizations');
          },
   
          onFailure: function(err) {
              myThis.showClickedButtonState(false);
              if (err.code === "UserNotConfirmedException") {
                myThis.props.history.push('confirmregistration');
              }
              alert(err.message);
          }
      });
    }

}

export default SignInComponent;