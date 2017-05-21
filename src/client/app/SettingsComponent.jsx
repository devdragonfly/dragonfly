import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="settings" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            
            
            <h3>Settings</h3>
            
            <br/><br/>
            
            <h4>Organization Name</h4>
            {this.props.organizationName}
            &nbsp;&nbsp;
            <Link to={`organizationname`}><i className='fa fa-edit fa-fw'></i></Link>
            
            
            <br/><br/>
            
            <h4>Team</h4>
            [list team members here]<br/>
            add remove
            
            
            
          </div>
        </div>



    );
  }


}

export default SettingsComponent;