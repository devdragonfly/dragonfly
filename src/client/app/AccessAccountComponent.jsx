//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});



const buttonClassName = "btn btn-primary btn-lg";

class AccessAccountComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.email,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
      
      <div className="row home-bg-outer"><div className="col-sm-12">
      <div className="home-bg-inner">
      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-4">
          <br/><br/><br/><br/>
          <div className="signUpBox">
          <form onSubmit={this.handleSubmit}>
              <h1 className="dragonfly-blue">Access Account</h1>
              
              Trouble accessing your account?<br/><br/>
              
              Please enter your email and we will send a code for regaining access.<br/><br/>
              
              <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
              <br/>
            <input type="submit" className={this.state.buttonRestClassName} value="Send" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Sending</div>
          </form>
          </div>
          <br/><br/><br/><br/>
        </div>
        <div className="col-sm-7">
        </div>
        </div></div>
      </div></div>
      
      
      
      
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
  
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    
    
    const email = this.state.emailValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    this.props.handleLoadEmail(email);
    var myThis = this;
    
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            myThis.showClickedButtonState(false);
            myThis.props.history.push('createnewpassword');
        },
        onFailure: function(err) {
            myThis.showClickedButtonState(false);
            alert(err);
        }
    });
    
    
  }
}

export default AccessAccountComponent;