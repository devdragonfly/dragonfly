//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';



class DragonflyCompleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path : "not found"
    };
    
    this.titleCase = this.titleCase.bind(this);
  }
  
  
  componentWillMount() {
    
    var dragonfly = this.props.dragonfly;
    
    // if previousCompletion = true, this was an already completed dragonfly where link was re-clicked
    var previousCompletion = dragonfly.previousCompletion;
    if (previousCompletion) return;
    
    
    var organizationId = dragonfly.organizationId;
    var campaignId = dragonfly.campaignId;
    var dragonflyId = dragonfly.dragonflyId;
    var results = dragonfly.results;
    var earned = dragonfly.earned;
    var preferences = dragonfly.preferences;
    
    var myThis = this;
    
    var params = {
            TableName:"Results",
            Key: {
                campaignId  : campaignId,
                dragonflyId : dragonflyId
            },
            UpdateExpression: "set results = :results, earned = :earned, preferences = :preferences",
            ExpressionAttributeValues:{
                ":results":results, ":earned":earned, ":preferences":preferences
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
            UpdateExpression: "set results = :results, earned = :earned, preferences = :preferences",
            ExpressionAttributeValues:{
                ":results":results, ":earned":earned, ":preferences":preferences
            },
            ReturnValues:"UPDATED_NEW"
        };
        
    this.props.dbUpdateUnauth(params2, function(result) {
      // results successfully saved
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
      paymentText = "We will text you at " + mobile + " with your payment of $" + earned + ".";
    }
    
    
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">

                <h2>Thank you {first}!</h2>
                
                <br/>
                
                {paymentText}
                
                <br/><br/>
                
                Typically we complete all payments within 8 business hours.
                
                <br/><br/>
                
                If you do not receive payment within 8 business hours, please contact us at <b>support@dragonfly.one</b>.
                
                <br/><br/>
                
                Limited spots are available for the Dragonfly pre-launch in late 2018. Please contact us at <b>launch@dragonfly.one</b> to be included.
                
              </div>
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><img src="./images/dragonfly-logo.png" /></div>
              </a>
              
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