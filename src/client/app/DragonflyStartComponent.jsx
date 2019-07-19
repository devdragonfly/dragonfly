//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';
import LogoComponent from './components/LogoComponent.jsx';



class DragonflyStartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path : "not found"
    };
    this.titleCase = this.titleCase.bind(this);
    this.showCustomText = this.showCustomText.bind(this);
    this.checkIfTimestampExpired = this.checkIfTimestampExpired.bind(this);
    this.getDateObject = this.getDateObject.bind(this);
  }


  componentWillMount() {
    var results = this.props.dragonfly.results;

    if (results != null) {
      this.props.history.push('dragonflycomplete');
    }

    var campaignId = this.props.dragonfly.campaignId;
    var campaigns = this.props.campaigns;
    var campaign;

    // Find needed Campaign
    for (let i = 0; i < campaigns.length; i++) {
      if (campaigns[i].campaignId == campaignId) {
        this.currentCampaign = campaigns[i];
        break;
      }
    }

    // Determine if Campaign Date is Expired
    var endDate = this.currentCampaign.expirationDate;
    this.campaignIsExpired = this.checkIfTimestampExpired(endDate);
  }

  componentDidMount() {
    var dragonfly = this.props.dragonfly;

    mixpanel.track('Session Opened', {
      'DragonflyId': dragonfly.dragonflyId,
      'CampaignId': dragonfly.campaignId,
      'FirstName': dragonfly.contact.first,
      'LastName': dragonfly.contact.last,
      'Email': dragonfly.contact.email,
      'Incentive': dragonfly.incentive,
      'CheckboxManualDemo': dragonfly.checkbox
    });

    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host;
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }

  render() {
    if (this.campaignIsExpired) {
      return this.expiredNotice();
    }
    var dragonfly = this.props.dragonfly;
    var totalQuestionCount = dragonfly.session.totalQuestionCount;
    var contact = dragonfly.contact;
    var first = this.titleCase(contact.first);
    var last = this.titleCase(contact.last);
    var email = contact.email;
    var incentive = Number(dragonfly.incentive).toFixed(2);
    var checkbox = dragonfly.checkbox;

    // checkbox manual demo
    if (checkbox) {
      return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <br/><br/>
          <div className="jumbotron dragon-enlarge bg-white">
            <div className="clearfix">
              <a href={this.state.path} target="_blank">
                <div className="dragon-powered-by divLeft">
                  <LogoComponent dragonfly={dragonfly} />
                </div>
              </a>
            </div>
            <h2>Hello {first} {last},</h2>
            <br/><br/>
            { this.showCustomText(dragonfly.customTexts, "welcome") }
            <br/><br/>
            You can earn ${incentive} payment if you answer {totalQuestionCount} questions appropriately.
            <br/><br/>
            { this.showCustomText(dragonfly.customTexts, "payment") }
            <br/><br/><br/>
            <Link to={`dragonflyplay`} className="btn btn-primary btn-lg">Start Now <i className='fa fa-chevron-circle-right'></i></Link>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
    }

    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <br/><br/>
          <div className="jumbotron dragon-enlarge bg-white">
            <div className="clearfix">
              <a href={this.state.path} target="_blank">
                <div className="dragon-powered-by divLeft">
                  <LogoComponent dragonfly={dragonfly} />
                </div>
              </a>
            </div>
            <h2>Hello {first} {last},</h2>
            <br/><br/>
            { this.showCustomText(dragonfly.customTexts, "welcome") }
            <br/><br/>
            You can earn ${incentive} payment if you answer {totalQuestionCount} questions appropriately.
            <br/><br/>
            { this.showCustomText(dragonfly.customTexts, "payment") }
            <br/><br/><br/>
            <Link to={`dragonflyplay`} className="btn btn-primary btn-lg">Start Now <i className='fa fa-chevron-circle-right'></i></Link>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
  }

  showCustomText(txtObj, prop) {
    if (txtObj && txtObj[prop] != "custom text") {
      return txtObj[prop];
    } else {
      if (prop == 'welcome') {
        return "Welcome to Dragonfly! We are beta testing our new Incentivized Information technology where we pay you to engage with information.";
      }
      if (prop == "payment") {
        return "At the end we will pay you through the Venmo App and you can designate if you prefer payment by email or phone.";
      }
    }
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  checkIfTimestampExpired(expDate){
    if (expDate === undefined) {
      return false;
    }

    var currentDate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).split(',')[0];
    currentDate = this.getDateObject(currentDate, '/', 'mm/dd/yy');
    var expirationDate = this.getDateObject(expDate, '-', 'yy/mm/dd');

    if (currentDate.year > expirationDate.year) {
      return true;
    }

    if (currentDate.year === expirationDate.year) {
      if (currentDate.month > expirationDate.month) {
        return true;
      }

      if (currentDate.month === expirationDate.month && currentDate.day >= expirationDate.day) {
        return true;
      }
    }

    return false;
  }

  getDateObject(stringDate, separator, format) {
    var date = stringDate.split(separator);
    if (format == 'mm/dd/yy'){
      return {month: parseInt(date[0]), day: parseInt(date[1]), year: parseInt(date[2])};
    } else if (format == 'yy/mm/dd'){
      return {year: parseInt(date[0]), month: parseInt(date[1]), day: parseInt(date[2])};
    }
  }

  expiredNotice() {
    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <div className="jumbotron dragon-enlarge bg-white">
            <div className="clearfix">
              <a href={this.state.path} target="_self">
                <div className="dragon-powered-by divLeft">
                  <LogoComponent dragonfly={{dragonfly: {}}} />
                </div>
              </a>
            </div>
            <br/>
            <h3>This Dragonfly link has expired. Please contact the sender if you have any questions.</h3>
          </div>
        </div>
      </div>
    );
  }


}

export default DragonflyStartComponent;
