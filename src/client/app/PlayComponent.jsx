//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class PlayComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {unused : "not found"
    };
  }

  render() {
    var dragonfly = this.props.dragonfly;
    var contact = dragonfly.contact;
    var first = contact.first; 
    var last = contact.last; 
    var email = contact.email;
    
    
    return (
      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
              
              <br/><br/>
        
              Hello {first} {last},
              
              <br/><br/>
              
              The video you are about to watch is XX minutes long and you will be presented 5 questions at various points throughout it.
              
              <br/><br/>
              
              You have the opportunity to earn up to $XX.XX based on how much information you retain measured by how many questions you get right.
              
              <br/><br/>
              
              On completion of this tutorial, you will receive an email at {email}
              
              with instructions on how to claim your reward.
              
              <br/><br/>
            
              <Link to={`preview`} className="btn btn-primary"><i className='fa fa-plus'></i> Start Now </Link>
              
              
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      
    );
  }

}

export default PlayComponent;