//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';
import LogoComponent from './components/LogoComponent.jsx';

const buttonClassName = "btn btn-primary";

class DragonflyCompleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: "not found",
      dragonflyExist: true,
      openTextValue : "",
      buttonRestClassName : buttonClassName,
      buttonClickedClassName : "dragon-hidden"
    };

    this.titleCase = this.titleCase.bind(this);
    this.handleOpenTextChange = this.handleOpenTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    var myThis = this;
    var dragonfly;

    if (this.props.dragonfly === 'not found') {
      this.setState({dragonflyExist: false});
      const dragonflyId = localStorage.getItem('dragonflyId');
      this.props.handleLoadDragonflyId(dragonflyId);

      var params = {
          TableName : "Dragonflies",
          KeyConditionExpression: "#dragonflyId = :dragonflyId",
          ExpressionAttributeNames:{
              "#dragonflyId": "dragonflyId"
          },
          ExpressionAttributeValues: {
              ":dragonflyId":dragonflyId
          }
      };

      this.props.dbQueryUnauth(params, function(result) {
        dragonfly = result.Items[0];
        dragonfly.previousCompletion = true;
        myThis.props.handleLoadDragonfly(dragonfly);
        myThis.setState({dragonflyExist: true})
      });

    } else {
      dragonfly = this.props.dragonfly;
      // if previousCompletion = true, this was an already completed dragonfly where link was re-clicked
      var previousCompletion = dragonfly.previousCompletion;
      if (previousCompletion) return;

      var organizationId = dragonfly.organizationId;
      var campaignId = dragonfly.campaignId;
      var dragonflyId = dragonfly.dragonflyId;
      var results = dragonfly.results;
      var earned = dragonfly.earned;
      var preferences = dragonfly.preferences;
      var date_completed = new Date().toISOString();

      var myThis = this;

      var params = {
              TableName:"Results",
              Key: {
                  campaignId  : campaignId,
                  dragonflyId : dragonflyId
              },
              UpdateExpression: "set results = :results, earned = :earned, preferences = :preferences, date_completed = :date_completed",
              ExpressionAttributeValues:{
                  ":results": results,
                  ":earned": earned,
                  ":preferences": preferences,
                  ":date_completed": date_completed
              },
              ReturnValues:"UPDATED_NEW"
          };


      this.props.dbUpdateUnauth(params, function(result) {
        // results successfully saved // test
      });

      var params2 = {
              TableName:"Dragonflies",
              Key: {
                  organizationId  : organizationId,
                  dragonflyId : dragonflyId
              },
              UpdateExpression: "set results = :results, earned = :earned, preferences = :preferences, date_completed = :date_completed",
              ExpressionAttributeValues:{
                  ":results":results,
                  ":earned":earned,
                  ":preferences":preferences,
                  ":date_completed": date_completed
              },
              ReturnValues:"UPDATED_NEW"
          };

      this.props.dbUpdateUnauth(params2, function(result) {
        // results successfully saved
      });
    }

    mixpanel.track('Received Confirmation Page', {
      'DragonflyId': dragonfly.dragonflyId,
      'CampaignId': dragonfly.campaignId,
      'FirstName': dragonfly.contact.first,
      'LastName': dragonfly.contact.last,
      'Email': dragonfly.contact.email,
      'Incentive': dragonfly.incentive,
      'CheckboxManualDemo': dragonfly.checkbox
    });

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

    if (!this.state.dragonflyExist) return null;

    var dragonfly = this.props.dragonfly;

    var contact = dragonfly.contact;
    var first = this.titleCase(contact.first);
    //var last = this.titleCase(contact.last);

    //var reward = Number(dragonfly.reward).toFixed(2);
    var earned = Number(dragonfly.earned).toFixed(2);

    var preferences = dragonfly.preferences;
    var email = preferences.email;
    var mobile = preferences.mobile;
    var checkbox = dragonfly.checkbox;

    var paymentText;
    if (preferences.emailOrText == "text") {
      paymentText = "We will send your payment of $" + earned + " using Venmo to " + mobile + ".";
    } else {
      paymentText = "We will email you at " + email + " with your payment of $" + earned + ".";
    }
    paymentText += ' Please screenshot this confirmation page for your records and contact the sender if you have any questions or concerns.';


    // checkbox trigger manual deliver
    if (checkbox) {
      paymentText = "Thank you " + first + " you earned $" + earned + ".";

      return (
        <div className="row">
          <div className="col-sm-2">
          </div>
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

                  <h1>
                    Thank you {first} you earned ${earned}!
                  </h1>

                  <h2>
                    Please screenshot this confirmation page for your records and contact the sender if you have any questions or concerns.
                  </h2>

                  <br/>

                  <br/><br/>
                  <br/><br/>

                </div>
          </div>
          <div className="col-sm-2">
          </div>
        </div>

      );
    }

    return (
      <div className="row">
        <div className="col-sm-2">

        </div>
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

                <h2>Thank you {first}!</h2>

                <br/>

                {paymentText}

                <br/><br/>
                {
                  dragonfly.customTexts && dragonfly.customTexts.complete != "custom text" ?
                  dragonfly.customTexts.complete :
                  "Typically we complete all payments within 8 business hours."
                }
                <br/><br/>



              </div>
        </div>
        <div className="col-sm-2">
        </div>
      </div>

    );
  }


  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  handleOpenTextChange(e) {
    this.setState({
      openTextValue: e.target.value
    });
  }

  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;

    var preferences = {};
    preferences.emailOrText = this.state.selectedContactOption;
    preferences.nps = this.state.selectedNPS;
    preferences.email = this.state.email;
    preferences.mobile = this.state.mobile;
    preferences.text = this.state.openTextValue;

    if ((preferences.email == "") || (preferences.email == null)) preferences.email = "none";
    if ((preferences.mobile == "") || (preferences.mobile == null)) preferences.mobile = "none";
    if ((preferences.text == "") || (preferences.text == null)) preferences.text = "none";

    var dragonfly = this.props.dragonfly;
    dragonfly.preferences = preferences;
    this.props.handleLoadDragonfly(dragonfly);
    myThis.showClickedButtonState(false);
    myThis.props.history.push('dragonflycomplete');
  }

}

export default DragonflyCompleteComponent;
