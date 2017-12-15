import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class CampaignNoSessionsComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();

    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
            To build a Campaign, you first need to create a Session.
            <br/><br/>
            There are currently no Sessions under this Organization.
            <br/><br/>
            <Link to={`createsession`}>Click here to create your first Session.</Link>
            
          </div>
          
        </div>

    );
  }
  


}



export default CampaignNoSessionsComponent;