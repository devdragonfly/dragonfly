import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


import C3Chart from 'react-c3js';
// import 'c3/c3.css';

class CampaignsComponent extends React.Component {

  constructor(props) {
    super(props);


    this.searchInput = this.searchInput.bind(this);
  }


  componentWillMount() {
    this.props.handleLoadResults("not found");
    var campaigns = this.props.campaigns;
    if (campaigns === 'not found') {
      this.props.history.push('loadcampaigns');
    }

    this.state = {
      allCampaigns: this.props.campaigns,
      loadedCampaigns: this.props.campaigns,
      searchInput: '',
    }
    
  }



  searchInput(event) {
    console.log("Searching...: ");

    this.setState({ searchInput: event.target.value});
    this.setState({ loadedCampaigns: this.state.allCampaigns.filter(function(campaign) {
      var campaignName = campaign.name.toLowerCase();
      return campaignName.indexOf(event.target.value.toLowerCase()) > -1; 
    })});
  }

  render() {
    console.log("RENDERING CAMPAIGNS");
    var campaigns = this.props.campaigns;
    var loadedCampaigns = this.state.loadedCampaigns;
    var handleLoadCampaign = this.props.handleLoadCampaign;
    var history = this.props.history;

    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();

    var campaignsJsx = function () { return '' }();

    if (campaigns !== 'not found') {
      if (campaigns.length === 0) {
        campaignsJsx = function () { return 'No campaigns created yet.' }();

      } else {
        campaignsJsx = loadedCampaigns.map((campaign, i) => {
          return <Campaign campaign={campaign} handleLoadCampaign={handleLoadCampaign} history={history} />
        });
      }
    }
  



    return (
      <div id="comapings_component">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">My Dragonflies</h3>
                  <p>Send a Dragonfly, analyze it in real-time, and measure how it performs.</p>
                </div>

                <div className="page_header_action float-right">
                  <Link to={`createcampaign`} className="btn btn-primary float-right"><i className="far fa-paper-plane"></i> Send a Dragonfly</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="search-container">
                  <div className="form-group search-box">
                    <input ref="searchInput" id="search-input" onChange={this.searchInput} type="text" className="form-control" placeholder="Search Dragonfly Campaigns..." />
                    <button className="search-btn">
                      <i className='fa fa-search'></i>
                    </button>
                  </div>
                </div>
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
      size: {
        height: 200,
        width: 324
      },
      columns: [
        // each columns data
        [
          "data1",
          0,
          5,
          1,
          2,
          7,
          5,
          6,
          8,
          14,
          7,
          12,
          5,
          16,
          3,
          10,
          2,
          6,
          30,
          18,
          18,
          15,
          14,
          47,
          43,
          55,
        ],
      ],
      type: "area", // default type of chart
      groups: [["data1"]],
      // colors: {
      //   data1: colors["blue"],
      // },
      names: {
        // name of each serie
        data1: "Impressions",
      },
      axis: {
        y: {
          padding: {
            bottom: 0,
          },
          show: false,
          tick: {
            outer: false,
          },
        },
        x: {
          padding: {
            left: 0,
            right: 0,
            bottom: 0,
          },
          show: false,
        },
      },
      legend: {
        position: "inset",
        padding: 0,
        inset: {
          anchor: "top-left",
          x: 20,
          y: 8,
          step: 10,
        },
      },
      tooltip: {
        format: {
          title: function (x) {
            return "";
          },
        },
      },
      padding: {
        bottom: 0,
        left: -1,
        right: -1,
      },
      point: {
        show: false,
      },
    };

    // var compaignAnalytics = function () { return <C3Chart data={data} /> }();

    // campaignAnalytics.chart.resize({
    //   height: 200,
    //   width: 324
    // });

    var expiresAt = 'Never Expires';
    if (this.props.campaign.expirationDate) {
      expiresAt = "Ends: " + this.props.campaign.expirationDate;
    }

    return (
      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

        <div id="campaign_component" className="" onClick={this.handleSelectCampaign.bind(this, this.props.campaign)}>
          <div className="campaign_card">
            <div className="card">
              <div className="card-body">
                <div className="card-actions-icon">
                  <i className="fas fa-ellipsis-h pull-right"></i>
                </div>

                <h5 className="card-title">{this.props.campaign.name}</h5>
                <h6 className="card-subtitle mb-2">{expiresAt}</h6>

                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <div className="c3-chart-container">
                  {/* {compaignAnalytics} */}
                </div>

                <div className="card-action-links">
                  {/* <a className="card-link link-campaign-view"><i className="fas fa-chart-line"></i> View</a>
                  <a className="card-link link-campaign-edit"><i className="fas fa-pencil-alt"></i> Edit</a> */}
                  <a className="card-link link-campaign-edit"><i className="fas fa-chart-line"></i> View</a>

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
