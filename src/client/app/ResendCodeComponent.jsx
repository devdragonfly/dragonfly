//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});





class ResendCodeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.user.username,
                  buttonNormal : "btn btn-success btn-lg",
                  buttonClicked : "dragon-hidden",
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
      <div className="row">
        <div className="col-sm-6">

        </div>
        <div className="col-sm-3">
            <h1>Resend Email</h1>
            
            Please enter your email and we will re-send the verification code.<br/><br/>
            
            <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
            <br/>
            <button onClick={this.handleSubmit} className={this.state.buttonNormal}>Send</button>  
            <button className={this.state.buttonClicked}><i className='fa fa-circle-o-notch fa-spin'></i> Sending</button>  
        </div>
        <div className="col-sm-3">

        </div>
      </div>
      
    );
  }
  

  updateEmailValue(e) {
    this.setState({
      emailValue: e.target.value
    });
  }
  
  
  handleSubmit(e) {
    this.setState({buttonClicked : this.state.buttonNormal});
    this.setState({buttonNormal : "dragon-hidden"});
    
    
    const email = this.state.emailValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    var thisProps = this.props; // we lose this.props inside the resendConfirmationCode function
    
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
        thisProps.history.push('confirmregistration');
    });
    
    
  }
}

export default ResendCodeComponent;