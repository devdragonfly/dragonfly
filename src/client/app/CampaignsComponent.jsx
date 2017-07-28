import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class CampaignsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>Campaigns</h3>
            
          </div>
        </div>



    );
  }


}

export default CampaignsComponent;