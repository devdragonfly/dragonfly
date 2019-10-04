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
                  <Link to={`createcampaign`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Add Campaign</Link>
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

    // const data = {
    //   type: "area",
    //   columns: [
    //     ['data1', 30, 200, 100, 400, 150, 250]
    //   ],
    //   axis: {
    //     x: {
    //       show: false,
    //       tick: {
    //         outer: false
    //       }
    //     },
    //     y: {
    //       show: false
    //     }
    //   },
    //   legend: {
    //     show: false
    //   }
    // };

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
          10,
          10,
          15,
          14,
          47,
          59,
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

    var compaignAnalytics = function () { return <C3Chart data={data} /> }();

    // campaignAnalytics.chart.resize({
    //   height: 200,
    //   width: 324
    // });


    return (
      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

        <div id="campaign_component" className="" onClick={this.handleSelectCampaign.bind(this, this.props.campaign)}>
          <div className="campaign_card">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.props.campaign.name}</h5>
                <h6 className="card-subtitle mb-2">Card subtitle</h6>

                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                <div className="c3-chart-container">
                  {compaignAnalytics}
                </div>

                <div className="card-action-links">
                  <a className="card-link link-campaign-view"><i className="fas fa-chart-line"></i> View</a>
                  <a className="card-link link-campaign-edit"><i className="fas fa-pencil-alt"></i> Edit</a>
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
