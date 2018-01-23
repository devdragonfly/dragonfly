//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";



class ViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {unused : "not found"
    };
    this.getParameterByName = this.getParameterByName.bind(this);
  }
  
  componentWillMount() {
    var dragonflyId = this.getParameterByName("id");
    this.props.handleLoadDragonfly(dragonflyId);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
              {this.props.dragonfly}
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      
    );
  }
  
  
  getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

}

export default ViewComponent;