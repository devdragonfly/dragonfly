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



const buttonClassName = "btn btn-primary btn-lg";

class ConfirmRegistrationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {codeValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateCodeValue = this.updateCodeValue.bind(this);
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
              <h1 className="dragonfly-blue">Confirm Email Address</h1>
              A six-digit verification code was sent to the email address <br/><br/>
              <i>{this.props.email}</i>. <br/><br/> 
              Please enter that code here so we can verify this is your email.
              <br/><br/>
              <b>VERIFICATION CODE</b><br/>
              <input value={this.state.codeValue} onChange={this.updateCodeValue} className="form-control input-lg"/>
              <br/>
            <input type="submit" className={this.state.buttonRestClassName} value="Confirm" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Confirming</div>
          </form>
            <br/><br/>
            
            Can't find email with verification code?<br/>
            <Link to={`resendcode`}>Re-send email.</Link>
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
  
  updateCodeValue(e) {
    this.setState({
      codeValue: e.target.value
    });
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    
    
    const email = this.props.email;
    const code = this.state.codeValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    var myThis = this; // we lose this.props inside the confirmRegistration function
    
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        myThis.showClickedButtonState(false);
          if (err) {
          alert(err);
          return;
        }
        myThis.props.history.push('successcodeverified');
    });
    
    
  }
}

export default ConfirmRegistrationComponent;