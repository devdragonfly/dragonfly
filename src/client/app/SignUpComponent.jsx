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
    this.state = {emailValue : props.user.username, 
                  passwordValue : '',
                  buttonNormal : "btn btn-success btn-lg",
                  buttonClicked : "dragon-hidden",
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          Marketing text here...
        </div>
        <div className="col-sm-3">
            <h1>Sign Up</h1>
            <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
            <br/>
            <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg"/>
            <br/>
            <button onClick={this.handleSubmit} className={this.state.buttonNormal}>Create Account</button>   
            <button className={this.state.buttonClicked}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</button>   
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