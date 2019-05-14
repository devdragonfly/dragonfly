import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import ExportCampaignButton from './ExportCampaignButton.jsx';
import Chart from 'chart.js';

class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);


    this.state = {path : "not found",
                  totals: []
    };




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
      this.setState({path : path});
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


      totals = Array.apply(null, Array(numberOfQuestions)).map(Number.prototype.valueOf,0);
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
        scales: {yAxes: [{display: true, ticks: { beginAtZero: true }}]}

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


    this.setState({totals : totals});

  }

  render() {
    var path = this.state.path;

    console.log(this.props.campaign);

    var dragonflies = this.props.results;
    var sessionName = "session name";

    var dragonfliesJsx = function() {return '' }();

    if (dragonflies !== 'not found') {
      dragonflies = dragonflies.Items;
      if (dragonflies.length === 0) {
        dragonfliesJsx = function() {return 'ERROR: No dragonflies created.' }();

      } else {
        dragonfliesJsx = dragonflies.map((dragonfly, i) => {
            sessionName = dragonfly.session.name;
            return <Dragonfly dragonfly={dragonfly} path={path}/>

        });
      }
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" />}();
    var exportCsvButton  = function() {return <ExportCampaignButton dragonfliesData={dragonflies}/>}();

    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-8">

            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>

            <br/><br/>

            <div className="row">
              <div className="col-sm-4">
                <h4>Session</h4>
                <i className='fa fa-graduation-cap fa-fw'></i>
                {sessionName}
              </div>
              <div className="col-sm-4">
                <h4>Expiration Date</h4>
                <i className='fa fa-calendar-times-o fa-fw'></i>
                {this.props.campaign.expirationDate || 'Not set'}
              </div>
            </div>

            <br/><br/>
            <h4>Results</h4>
            <canvas id="questionResultsChart"></canvas>

            <br/><br/>

            <h4>Export CSV</h4>
            {exportCsvButton}

            <br/><br/>
            <h4>Dragonflies</h4>
            {dragonfliesJsx}


          </div>
          <div className="col-sm-2">
          </div>
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
    if (this.props.dragonfly.results != null) {status = "completed"}
    return (
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
