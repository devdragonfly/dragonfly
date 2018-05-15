//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';



class DragonflyCompleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {earned: this.props.preview.earned,
                  path : "not found"
    };
    this.titleCase = this.titleCase.bind(this);
  }
  
  
  componentWillMount() {
    
    
    var organizationId = this.props.dragonfly.organizationId;
    var campaignId = this.props.dragonfly.campaignId;
    var dragonflyId = this.props.dragonfly.dragonflyId;
    var results = this.props.preview.results;
    var earned = this.props.preview.earned;
    
    if (this.props.dragonfly.results != null) {
      this.setState({earned : this.props.dragonfly.earned });
      return;
    }
    
    var myThis = this;
    
    var params = {
            TableName:"Results",
            Key: {
                campaignId  : campaignId,
                dragonflyId : dragonflyId
            },
            UpdateExpression: "set results = :results, earned = :earned",
            ExpressionAttributeValues:{
                ":results":results, ":earned":earned
            },
            ReturnValues:"UPDATED_NEW"
        };


    this.props.dbUpdateUnauth(params, function(result) {
      // results successfully saved
    });
    
    
    

    var params2 = {
            TableName:"Dragonflies",
            Key: {
                organizationId  : organizationId,
                dragonflyId : dragonflyId
            },
            UpdateExpression: "set results = :results, earned = :earned",
            ExpressionAttributeValues:{
                ":results":results, ":earned":earned
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
    var last = this.titleCase(contact.last); 
    var email = contact.email;
    var reward = Number(dragonfly.reward).toFixed(2);
    var earned = Number(this.state.earned).toFixed(2);
    
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">

                <h2>Congratulations {first}!</h2>
                
                <br/>
                
                Your session is complete.
                
                <br/><br/>
                
                You have earned ${earned}.
                
                <br/><br/>
                
                An email has been sent to <b>{email}</b> with instructions on accessing your reward.
                
                <br/><br/>
                
                If you do not receive this email in the next 5 minutes, please contact us at <b>support@dragonfly.com</b>.
                
              </div>
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><div>powered by</div> <img src="./images/dragonfly-logo.png" /></div>
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