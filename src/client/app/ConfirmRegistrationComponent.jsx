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





class ConfirmRegistrationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {codeValue : ''};
    this.updateCodeValue = this.updateCodeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        CODE<br/>
        <input value={this.state.codeValue} onChange={this.updateCodeValue}/><br/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }

  updateCodeValue(e) {
    this.setState({
      codeValue: e.target.value
    });
  }
  
  
  handleSubmit(e) {
  }
}

export default ConfirmRegistrationComponent;