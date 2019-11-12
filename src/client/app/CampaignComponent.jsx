import React from 'react';
import { Link } from 'react-router';
import ExportCampaignButton from './ExportCampaignButton.jsx';
import Chart from 'chart.js';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

import ConfirmDeleteModal from './components/modals/ConfirmDeleteModal.jsx';

import C3Chart from 'react-c3js';


class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      path: "not found",
      totals: [],
      alertMessage: '',
      showDeleteModal: false
    };

    this.archiveDragonFly = this.archiveDragonFly.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);

  }


  componentWillMount() {
    var results = this.props.results;
    if (results.Count == 0) {
      this.props.history.push('generatedragonflies');
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host;
      this.setState({ path: path });
    } else {
      // work out what you want to do server-side...
    }

    var data = [];
    var dragonflies = this.props.results.Items;
    for (var i = 0; i < dragonflies.length; i++) {
      if (dragonflies[i].results != null) {
        data.push(dragonflies[i].results);
      }
    }

    var numberOfCompletedDragonflies = data.length;

    var totals = [];
    if (numberOfCompletedDragonflies > 0) {
      var numberOfQuestions = data[0].length;


      totals = Array.apply(null, Array(numberOfQuestions)).map(Number.prototype.valueOf, 0);
      for (var i = 0; i < numberOfCompletedDragonflies; i++) {
        for (var j = 0; j < numberOfQuestions; j++) {
          if (data[i][j].correct) totals[j] = totals[j] + 1;
        }
      }

    }


    var ctx = document.getElementById('questionResultsChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      options: {
        scales: { yAxes: [{ display: true, ticks: { beginAtZero: true } }] }

      },
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Campaign Results',
          data: totals,
          backgroundColor: "rgba(33, 95, 170, 0.3)"
        }]
      }
    });


    this.setState({ totals: totals });

  }

  toggleDeleteModal(e) {
    console.log("toggleDeleteModal() Called");

    if (this.state.showDeleteModal) {
      this.setState({ showDeleteModal: false });
    } else {
      this.setState({ showDeleteModal: true });
    }
  }

  archiveDragonFly() {

    var myThis = this;

    var organizationId = this.props.organizationId;
    var campaignId = this.props.campaign.campaignId;

    var params = {
      TableName: "Campaigns",
      Key: {
        organizationId: organizationId,
        campaignId: campaignId
      },
      UpdateExpression: "set isArchived = :isArchived",
      ExpressionAttributeValues: {
        ":isArchived": 1
      },
      ReturnValues: "UPDATED_NEW"
    }

    console.log(params);

    this.props.dbUpdate(params, function (result) {
      myThis.props.history.push('loadcampaigns');   
    });
  }



  render() {
    var path = this.state.path;

    var dragonflies = this.props.results;
    var sessionName = "session name";
    var numDragonflies = 0;

    var dragonfliesJsx = function () { return '' }();

    if (dragonflies !== 'not found') {
      dragonflies = dragonflies.Items;
      if (dragonflies.length === 0) {
        dragonfliesJsx = function () { return 'ERROR: No dragonflies created.' }();

      } else {
        numDragonflies = dragonflies.length;
        dragonfliesJsx = dragonflies.map((dragonfly, i) => {
          console.log("Campaign JSON: ", dragonfly);
          sessionName = dragonfly.session.name;
          return <Dragonfly dragonfly={dragonfly} path={path} />

        });
      }
    }


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

    // var compaignAnalytics = function () { return <C3Chart data={data} /> }();

    var exportCsvButton = function () { return <ExportCampaignButton dragonfliesData={dragonflies} /> }();
    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();



    return (
      <div id="viewCampaignComponent">
        {appMenu}

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">{this.props.campaign.name}</h3>
                  <p><b>Session: </b> {sessionName}</p>
                  <p><b>Expires: </b> {this.props.campaign.expirationDate ?
                    (this.props.campaign.expirationDate + ' at 00:00:00 GMT-4')
                    :
                    'Not set'
                  }</p>
                </div>

                <div className="page_header_action float-right">
                  <a onClick={this.toggleDeleteModal} className="btn btn-primary float-right ml-5"><i className="far fa-trash-alt"></i> Delete</a>
                  {exportCsvButton}
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="campaign_card pb-15">
                  <div className="card">
                    <div className="card-body">


                      <h5 className="card-title">Results</h5>
                      <h6 className="card-subtitle mb-2">0 Views</h6>

                      {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                      <div className="row">
                        <div className="col-12">
                          <canvas id="questionResultsChart"></canvas>

                          {/* <div className="c3-chart-container">
                            {compaignAnalytics}
                          </div> */}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-12">
                <hr />
                <div className="campaign_card">
                  <div className="card">
                    <div className="card-body">


                      <h5 className="card-title">Dragonflies</h5>
                      <h6 className="card-subtitle mb-2">{ numDragonflies } Contacts</h6>

                      {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                      <div className="row pb-10">
                        <div className="col-12">
                          <div className="c3-chart-container">
                            {dragonfliesJsx}

                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div>

        </div>

        <ConfirmDeleteModal show={this.state.showDeleteModal} handleSubmit={this.archiveDragonFly} onClose={this.toggleDeleteModal} />

      </div>

    );
  }

}




class Dragonfly extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var path = this.props.path;
    var dragonflyPath = path + "/#/view?id=" + this.props.dragonfly.dragonflyId;
    var status = "not opened";
    if (this.props.dragonfly.results != null) { status = "completed" }
    return (
      <div className="row">
        <div className="col-12">
          <div className="dragon-select-list-row dragon-pointer">
            <div className="dragon-select-list-cell">
              <i className='fa fa-address-book-o fa-fw fa-lg'></i>
            </div>
            <div className="dragon-select-list-cell">
              {this.props.dragonfly.contact.first}
              &nbsp;
            {this.props.dragonfly.contact.last}
            </div>
            <div className="dragon-select-list-cell">
              {this.props.dragonfly.contact.email}
            </div>
            <div className="dragon-select-list-cell">
              <span onClick={this.copyToClipboard.bind(this, dragonflyPath)}>
                <i className='fa fa-clipboard fa-fw'></i>
                Copy URL
            </span>
            </div>
            <div className="dragon-select-list-cell">
              {this.props.dragonfly.reward}
            </div>
            <div className="dragon-select-list-cell">
              <span onClick={this.showResults.bind(this, this.props.dragonfly)}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

    );
  }


  copyToClipboard(url) {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied to Clipboard: " + url);
  }

  showResults(dragonfly) {
    if (dragonfly.preferences == null) return;

    var preferences = dragonfly.preferences;
    var emailOrText = preferences.emailOrText;
    var email = preferences.email;
    var mobile = preferences.mobile;
    var nps = preferences.nps;
    var text = preferences.text;
    var earned = dragonfly.earned;

    alert("Contact Method: " + emailOrText + "\nEmail: " + email + "\nMobile: " + mobile + "\nNPS: " + nps + "\ntext: " + text + "\nAmount Earned: " + earned);
  }


}


export default CampaignComponent;
