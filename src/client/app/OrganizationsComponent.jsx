import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class OrganizationsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {menuClass: "dragon-hidden"};
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleSelectCreateOrganization = this.handleSelectCreateOrganization.bind(this);
  }


  mouseOver() {
      this.setState({menuClass: "dragon-menu-visible"});
      
  }

  mouseOut() {
      this.setState({menuClass: "dragon-hidden"});
  }



  render() {
    var handleLoadOrganization = this.props.handleLoadOrganization;
    var mouseOut = this.mouseOut;
    var organizations = this.props.organizations.map((organization, i) => {
      return <Organization name={organization.name} organizationid={organization.organizationid} handleLoadOrganization={handleLoadOrganization} mouseOut={mouseOut}/>
    });
    
    
    return (
      <div className="row dragon-org-row">
        <div className="col-sm-6">
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="dragon-org-menu">
              {this.props.organizationName} <i className="fa fa-caret-down"></i>
              <div className={this.state.menuClass}>
                {organizations}
                <div onClick={this.handleSelectCreateOrganization}>Create Organization</div>
              </div>
            </div>
        </div>
        <div className="col-sm-6">
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
        <div onClick={this.handleSelectOrganization.bind(this, this.props.organizationid, this.props.name)}>
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


export default OrganizationsComponent;