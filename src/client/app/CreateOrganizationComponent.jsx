import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";


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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={this.handleSubmit}>
                <h3>Create Organization</h3>
                <input value={this.state.nameValue} onChange={this.updateNameValue} className="form-control input-lg" placeholder="name of organization"/>
                <br/>
              <input type="submit" className={this.state.buttonRestClassName} value="Create Organization" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Organization</div>
            </form>
          </div> 
          <div className="col-sm-8">
          </div>
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
  
  handleSubmit(e) {
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
    
    this.props.dbPut(params, function(result){ 
      myThis.showClickedButtonState(false); 
      myThis.props.handleLoadOrganization(organizationIdValue, nameValue);
      myThis.props.history.push('loadorganizations');
    });
    
  }
  
  
}

export default CreateOrganizationComponent;