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
    this.state = {menuClass: "dragon-hidden"};
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleSelectProfile = this.handleSelectProfile.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

  }

    mouseOver() {
        this.setState({menuClass: "dragon-menu-visible"});

    }

    mouseOut() {
        this.setState({menuClass: "dragon-hidden"});
    }

    render() {
        return (
          <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="dragon-user-menu pull-right">
            <i className="fa fa-user-circle fa-2x"></i>
            <div className={this.state.menuClass}>
              <div onClick={this.handleSelectProfile}>Profile</div>
              <div>Something Else</div>
              <div onClick={this.handleSignOut}>Sign Out</div>
            </div>
          </div>
        );
    }

  handleSelectProfile() {
    this.props.history.push('profile');
  }


  handleSignOut(e) {

    const email = this.props.email;

    var userData = {
        Username : email,
        Pool : userPool
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
