import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  
  
  componentWillMount() {
    var results = this.props.results;
    if (results.Count == 0) {
      this.props.history.push('generatedragonflies');
    }
  }

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    var results = this.props.results;


    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-6">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
            
            {JSON.stringify(results)}
            
          </div>
          <div className="col-sm-4">
          </div>
          
        </div>

    );
  }
  
  
  

}


export default CampaignComponent;
