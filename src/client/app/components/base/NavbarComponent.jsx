import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import UserDropdownComponent from './UserDropdownComponent.jsx';

// import "./theme/Tabler.css";

// import { Card, Button } from "tabler-react";

class NavbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menuClass: "dragon-hidden" };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleSelectCreateOrganization = this.handleSelectCreateOrganization.bind(this);
  }


  mouseOver() {
    this.setState({ menuClass: "dragon-menu-visible" });

  }

  mouseOut() {
    this.setState({ menuClass: "dragon-hidden" });
  }



  render() {
    var handleLoadOrganization = this.props.handleLoadOrganization;
    var handleSignOut = this.props.handleSignOut;
    var percent = this.props.percent;
    var email = this.props.email;
    var history = this.props.history;
    var mouseOut = this.mouseOut;
    var organizations = this.props.organizations.map((organization, i) => {
      return <Organization name={organization.name} organizationId={organization.organizationId} handleLoadOrganization={handleLoadOrganization} mouseOut={mouseOut} history={history} />
    });

    var userDropdown = function () { return <UserDropdownComponent handleSignOut={handleSignOut} email={email} history={history} /> }();

    var progressBar = function () { return '' }();
    if (percent != 'not found') {
      progressBar = function () { return <ProgressBar percent={percent} /> }();
    }

    return (
      <div className="row dragon-navbar-inside">
        <div className="col-sm-8">
          <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="dragon-org-menu">
            <div className="dragon-org-name">{this.props.organizationName} <i className="fa fa-caret-down"></i></div>
            <div className={this.state.menuClass}>
              {organizations}
              <div onClick={this.handleSelectCreateOrganization}>Create Organization</div>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          {progressBar}
        </div>
        <div className="col-sm-2">
          {userDropdown}
        </div>
      </div >
    );
  }





  handleSelectCreateOrganization() {
    this.mouseOut();
    this.props.history.push('createorganization');
  }


}


class Organization extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.handleSelectOrganization.bind(this, this.props.organizationId, this.props.name)}>
        {this.props.name}
      </div>
    );
  }


  handleSelectOrganization(organizationid, name) {
    this.props.mouseOut();
    this.props.handleLoadOrganization(organizationid, name);
    this.props.history.push('loadorganization');
  }


}


class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var percent = this.props.percent;
    var width = percent + "%";

    return (
      <div className="progress dragonfly-progress">
        <div className="progress-bar" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" style={{ width: width }}>
          {percent}%
        </div>
      </div>
    );
  }

}


export default NavbarComponent;