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
    if (endDate) {
      var today = new Date().getTime();
      if (today >= Date.parse(endDate)) {
        this.campaignIsExpired = true;
      }
    }

  }

  componentDidMount() {
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
            You can earn ${incentive} cash if you answer {totalQuestionCount} questions correctly.
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
            <h3>This Dragonfly link has expired</h3>
          </div>
        </div>
      </div>
    );
  }


}

export default DragonflyStartComponent;
