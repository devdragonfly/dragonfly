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
    this.state = {codeValue : ''};
    this.updateCodeValue = this.updateCodeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
      <div className="row">
        <div className="col-sm-6">

        </div>
        <div className="col-sm-4">
            <h2>Confirm Email Address</h2>
            A six-digit verification code was sent to the email address <br/><br/>
            <i>{this.props.user.username}</i>. <br/><br/> 
            Please enter that code here so we can verify this is your email.
            <br/><br/>
            <b>VERIFICATION CODE</b><br/>
            <input value={this.state.codeValue} onChange={this.updateCodeValue} />
            <br/><br/>
            <button onClick={this.handleSubmit}>Confirm</button>   
        </div>
        <div className="col-sm-2">

        </div>
      </div>
      
    );
  }
  

  updateCodeValue(e) {
    this.setState({
      codeValue: e.target.value
    });
  }
  
  
  handleSubmit(e) {
    const email = this.props.user.username;
    const code = this.state.codeValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    var thisProps = this.props; // we lose this.props inside the confirmRegistration function
    
    cognitoUser.confirmRegistration(code, true, function(err, result) {
          if (err) {
          alert(err);
          return;
        }
        thisProps.history.push('successcodeverified');
    });
    
    
  }
}

export default ConfirmRegistrationComponent;