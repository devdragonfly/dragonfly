//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});





class CreateNewPasswordComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {codeValue : '',
                  passwordValue : '',
                  buttonNormal : "btn btn-success btn-lg",
                  buttonClicked : "dragon-hidden",
    };
    this.updateCodeValue = this.updateCodeValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
      <div className="row">
        <div className="col-sm-6">

        </div>
        <div className="col-sm-3">
            <h1>Create New Password</h1>
            A six-digit verification code was sent to the email address <br/><br/>
            <i>{this.props.user.username}</i>. <br/><br/> 
            Please enter that code here and create a new password.
            <br/><br/>
            <input value={this.state.codeValue} onChange={this.updateCodeValue} placeholder="code" className="form-control input-lg"/>
            <br/>
            <input value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="new password" type="password" className="form-control input-lg"/>
            <br/>
            <button onClick={this.handleSubmit} className={this.state.buttonNormal}>Save Password</button>   
            <button className={this.state.buttonClicked}><i className='fa fa-circle-o-notch fa-spin'></i> Saving Password</button>   
            
        </div>
        <div className="col-sm-3">

        </div>
      </div>
      
    );
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
    this.setState({buttonClicked : this.state.buttonNormal});
    this.setState({buttonNormal : "dragon-hidden"});
    
    
    const email = this.props.user.username;
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
            myThis.props.history.push('successpasswordsaved');
        },
        onFailure: function(err) {
            alert(err);
        }
    });
    
    
  }
}

export default CreateNewPasswordComponent;