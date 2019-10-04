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
            
            
            <h3>Settings</h3>
            
            <br/><br/>
            
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