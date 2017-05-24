//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});



const buttonClassName = "btn btn-success btn-lg";

class CreateNewPasswordComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {codeValue : '',
                  passwordValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateCodeValue = this.updateCodeValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
      <div className="row">
        <div className="col-sm-6">

        </div>
        <div className="col-sm-3">
          <form onSubmit={this.handleSubmit}>
              <h1>Create New Password</h1>
              A six-digit verification code was sent to the email address <br/><br/>
              <i>{this.props.email}</i>. <br/><br/> 
              Please enter that code here and create a new password.
              <br/><br/>
              <input value={this.state.codeValue} onChange={this.updateCodeValue} placeholder="code" className="form-control input-lg"/>
              <br/>
              <input value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="new password" type="password" className="form-control input-lg"/>
              <br/>
            <input type="submit" className={this.state.buttonRestClassName} value="Save Password" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving Password</div>
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
  
  updateCodeValue(e) {
    this.setState({
      codeValue: e.target.value
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
    
    
    const email = this.props.email;
    const code = this.state.codeValue.trim();
    const password = this.state.passwordValue.trim();
    
    var userData = {
        Username : email,
        Pool : userPool
    };
    
    var cognitoUser = new CognitoUser(userData);
    var myThis = this; // we lose this inside the confirmPassword function
    
    cognitoUser.confirmPassword(code, password, {
        onSuccess: function (result) {
            myThis.showClickedButtonState(false);
            myThis.props.history.push('successpasswordsaved');
        },
        onFailure: function(err) {
            myThis.showClickedButtonState(false);
            alert(err);
        }
    });
    
    
  }
}

export default CreateNewPasswordComponent;