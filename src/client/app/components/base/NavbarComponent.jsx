import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import UserDropdownComponent from '../../UserDropdownComponent.jsx';


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
      <div className="dragonfly-nav-container">

        <div className="row app-nav justify-content-center">
          <div className="col-12 col-lg-10 app-nav-container">
            <div className="row">


              <div className="app-organization-dropdown justify-content-end">

                <a onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} id="organizationDropdownLink" className="dropdown-container dropdown-toggle align-items-center" data-toggle="dropdown">
                  <div className="organization-dropdown-info">
                    <img className="avatar-org-dropdown" src="../../images/dragonfly2.png"></img>
                    <div className="organization-dropdown-name">
                      <div className="organization-dropdown-title">{this.props.organizationName} <i className="fa fa-caret-down"></i></div>
                    </div>
                  </div>
                </a>
                <ul className="dropdown-menu" id="dropdown">
                {organizations}
                  <div className="dropdown-divider"></div>
                  <li><a className="dropdown-item"  onClick={this.handleSelectCreateOrganization}><i className="fa fa-plus dropdown-icon"></i> Create Organization</a></li>
                </ul>
              </div>


              {/* <div className="col app-organization-select pt-4 justify-content-start">
                <img className="app-nav-logo" src="../../images/dragonfly2.png" />

                <div className="nav-organization-dropdown dropdown-container dropdown-toggle align-items-center" data-toggle="dropdown">
                  <div className="nav-organization-name" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}></div>
                  <ul className="dropdown-menu" id="dropdown">
                    <div className="dropdown-divider"></div>
                    <li><a className="dropdown-item"></a></li>
                  </ul>

                </div>

              </div> */}

              {/* <div className="col-sm py-0">
                {progressBar}
              </div> */}
              <div className="col app-user-dropdown-container justify-content-end align-items-center">
                {userDropdown}
              </div>
            </div>

          </div>
        </div>

      </div>

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
      <li><a className="dropdown-item" onClick={this.handleSelectOrganization.bind(this, this.props.organizationId, this.props.name)}><i className="fas fa-user dropdown-icon"></i> {this.props.name}</a></li>
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