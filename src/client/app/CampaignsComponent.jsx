import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class CampaignsComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  
  
  componentWillMount() {
    this.props.handleLoadResults("not found");
    var campaigns = this.props.campaigns;
    if (campaigns === 'not found') {
      this.props.history.push('loadcampaigns');
    }
  }

  render() {
    var campaigns = this.props.campaigns;
    var handleLoadCampaign = this.props.handleLoadCampaign;
    var history = this.props.history;
    
    var campaignsJsx = function() {return '' }();
    
    if (campaigns !== 'not found') {
          if (campaigns.length === 0) {
            campaignsJsx = function() {return 'No campaigns created yet.' }();
            
          } else {
            campaignsJsx = this.props.campaigns.map((campaign, i) => {
                return <Campaign campaign={campaign} handleLoadCampaign={handleLoadCampaign} history={history}/>
            });
          }
    }
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3>Campaigns</h3>
            
            <div className="dragon-select-list">
              {campaignsJsx}
            </div>
            
            <br/>
            
            <Link to={`createcampaign`} className="btn btn-primary"><i className='fa fa-plus'></i> Create Campaign</Link>
            
          </div>
          <div className="col-sm-4">
          </div>
            
        </div>



    );
  }


}





class Campaign extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div onClick={this.handleSelectCampaign.bind(this, this.props.campaign)} className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-line-chart fa-fw fa-lg'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.campaign.name}
          </div>
        </div>
    );
  }
  
  handleSelectCampaign(campaign) {
    this.props.handleLoadCampaign(campaign);
    this.props.history.push('loadresults');
  }

}




export default CampaignsComponent;