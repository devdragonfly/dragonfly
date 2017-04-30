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



const buttonClassName = "btn btn-success btn-lg";

class SignUpComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {emailValue : props.user.username, 
                  passwordValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          Marketing text here...
        </div>
        <div className="col-sm-3">
          <form onSubmit={this.handleSubmit}>
              <h1>Sign Up</h1>
              <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
              <br/>
              <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg"/>
              <br/>
            <input type="submit" className={this.state.buttonRestClassName} value="Create Account" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</div> 
          </form>
        </div>
        <div className="col-sm-3">
        </div>
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
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];
    
    
    var cognitoUser;
    var myThis = this;
    
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      myThis.showClickedButtonState(false);
        if (err) {
          alert(err);
          return;
        }
      cognitoUser = result.user;
      myThis.props.handleUserReceived(cognitoUser);
      myThis.props.history.push('confirmregistration');
    });
  }

}

export default SignUpComponent;