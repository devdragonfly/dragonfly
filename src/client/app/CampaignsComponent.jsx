import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

import C3Chart from 'react-c3js';
// import 'c3/c3.css';

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

    var campaignsJsx = function () { return '' }();

    if (campaigns !== 'not found') {
      if (campaigns.length === 0) {
        campaignsJsx = function () { return 'No campaigns created yet.' }();

      } else {
        campaignsJsx = this.props.campaigns.map((campaign, i) => {
          return <Campaign campaign={campaign} handleLoadCampaign={handleLoadCampaign} history={history} />
        });
      }
    }

    var organizationMenu = function () { return <OrganizationMenuComponent current="campaigns" /> }();
    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();


    return (
      <div id="comapings_component">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <h3 className="page_header_title float-left align-items-center">Campaigns</h3>
                <div className="page_header_action float-right">
                  <Link to={`createcampaign`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Campaign</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div className="row">
              {campaignsJsx}
            </div>

            <br />


          </div>
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

    const data = {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    };
    
    const mountNode = document.getElementById('react-c3js');
    
    // ReactDOM.render(<C3Chart data={data} />, mountNode);


    var compaignAnalytics = function () { return <C3Chart data={data} /> }();


    return (
      <div className="col-3 campaign-cards-container">

        <div id="campaign_component" className="">
          <div className="campaign_card" onClick={this.handleSelectCampaign.bind(this, this.props.campaign)}>
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.props.campaign.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>

                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div class="c3-chart-container">
                  {compaignAnalytics}
                </div>

                <div className="card-action-links">
                  <a href="#" className="card-link link-campaign-view"><i className="fas fa-chart-line"></i> View</a>
                  <a href="#" className="card-link link-campaign-edit"><i className="fas fa-pencil-alt"></i> Edit</a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* <div onClick={this.handleSelectCampaign.bind(this, this.props.campaign)} className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-line-chart fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell">
            {this.props.campaign.name}
          </div>
        </div> */}

      </div>
    );
  }

  handleSelectCampaign(campaign) {
    this.props.handleLoadCampaign(campaign);
    this.props.history.push('loadresults');
  }

}




export default CampaignsComponent;
