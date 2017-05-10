import React from 'react';
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";
var AWS = require("aws-sdk");

const AWSRegion = appconfig.region;
const AWSEndpoint = "https://dynamodb."  + appconfig.region + ".amazonaws.com";
const AWSIdentityPoolId = appconfig.IdentityPoolId;
const AWSLogin = 'cognito-idp.' + appconfig.region + '.amazonaws.com/' + appconfig.UserPoolId;



const buttonClassName = "btn btn-success btn-lg";

class CreateOrganizationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {nameValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateNameValue = this.updateNameValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  render() {
    return (
      
        <div>
          <form onSubmit={this.handleSubmit2}>
              <h3>Create Organization</h3>
              <input value={this.state.nameValue} onChange={this.updateNameValue} className="form-control input-lg"/>
              <br/>
            <input type="submit" className={this.state.buttonRestClassName} value="Create Organization" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Organization</div>
          </form>
            
        </div>

      
    );
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
  
  updateNameValue(e) {
    this.setState({
      nameValue: e.target.value
    });
  }
  
  handleSubmit2(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const nameValue = this.state.nameValue.trim();
    const userIdValue = this.props.userId;
    
    var organizationIdValue = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    

    
    var params = {
        TableName:"Organizations",
        Item:{
            userid : userIdValue,
            organizationid : organizationIdValue,
            name : nameValue
        }
    };
    
    alert(JSON.stringify(params));
    
    this.props.handleTest(params, function(){ myThis.showClickedButtonState(false); });
    
  }
  
  
}

export default CreateOrganizationComponent;