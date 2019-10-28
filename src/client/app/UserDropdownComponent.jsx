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



class UserDropdownComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuClass: "dragon-hidden" };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleSelectProfile = this.handleSelectProfile.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

  }

  mouseOver() {
    this.setState({ menuClass: "dragon-menu-visible" });

  }

  mouseOut() {
    this.setState({ menuClass: "dragon-hidden" });
  }

  render() {
    return (
      <div className="app-user-dropdown justify-content-end">

        <a onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} id="userDropdownLink" className="dropdown-container dropdown-toggle align-items-center" data-toggle="dropdown">
          <div className="user-dropdown-info">
            <img className="avatar-dropdown" src="../../images/placeholders/default.jpeg"></img>
            <div className="user-dropdown-username">
              <div className="user-dropdown-title"></div>
              <div className="user-dropdown-subtitle">{this.props.email}</div>
            </div>
          </div>
        </a>
        <ul className="dropdown-menu" id="dropdown">
          <li><a className="dropdown-item" onClick={this.handleSelectProfile}><i className="fas fa-user dropdown-icon"></i> Profile</a></li>
          <li><a className="dropdown-item" onClick={this.handlePushSettingsPage}><i className="fas fa-wrench dropdown-icon"></i> Settings</a></li>
          <div className="dropdown-divider"></div>
          <li><a className="dropdown-item" onClick={this.handleSignOut}><i className="fas fa-sign-out-alt dropdown-icon"></i> Sign Out</a></li>
        </ul>
      </div>

    );
  }

  handleSelectProfile() {
    this.props.history.push('profile');
  }

  handlePushSettingsPage() {
    this.props.history.push('settings');
  }


  handleSignOut(e) {

    const email = this.props.email;

    var userData = {
      Username: email,
      Pool: userPool
    };

    var cognitoUser = new CognitoUser(userData);

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    this.props.handleSignOut();

    this.props.history.push('signup');

  }

}

export default UserDropdownComponent;
