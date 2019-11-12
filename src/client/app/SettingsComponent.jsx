import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    // var organizationMenu = function() {return <OrganizationMenuComponent current="settings" /> }();
    var appMenu = function () { return <AppMenuComponent current="settings" /> }();

    
    return (

      <div className="settings-container">
        {appMenu}

        <div className="row justify-content-center">
          
          <div className="col-12 col-lg-10">

          <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">My Account</h3>
                  {/* <p>You have <b>{numContactLists}</b> contact lists.</p> */}
                </div>

                <div className="page_header_action float-right">
                  {/* <Link to={`createcontactlist`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Contact List</Link> */}
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>
            
            
            <h4>Organization Name</h4>
            {this.props.organizationName}
            &nbsp;&nbsp;
            <Link to={`organizationname`}><i className='fa fa-edit fa-fw'></i></Link>
            
            
            <br/><br/><br/>
            
            <h4>Team</h4>
            [list team members here]<br/>
            add remove
            
            
            
          </div>
        </div>

      </div>
        



    );
  }


}

export default SettingsComponent;