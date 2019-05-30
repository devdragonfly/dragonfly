//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';
import LogoComponent from './components/LogoComponent.jsx';


class DragonflyCompleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      path: "not found",
      dragonflyExist: true
    };

    this.titleCase = this.titleCase.bind(this);
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

      console.log('results', results);
      console.log('dragonfly', dragonfly);

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

    var paymentText = "We will email you at " + email + " with your payment of $" + earned + ".";
    if (preferences.emailOrText == "text") {
      paymentText = "We will send your payment of $" + earned + " using Venmo to " + mobile + ".";
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

                If you do not receive payment within 8 business hours, please contact us at <b>admin@dragonfly.one</b>.

                <br/><br/>

                Limited spots are available for the Dragonfly pre-launch in late 2018. Please contact us at <b>admin@dragonfly.one</b> to be included.

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


}

export default DragonflyCompleteComponent;
