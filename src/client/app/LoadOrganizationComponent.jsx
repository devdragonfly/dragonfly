import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class LoadOrganizationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {organizationName: this.props.organizationName};
  }
  
  componentWillMount() {
    var myThis = this;
    if (this.props.organizationId === "not found") {
        var organizations = this.props.organizations;
        var count = organizations.length;
        
        if (count === 0) {
          
                    const nameValue = "Sample Org";
                    const userIdValue = this.props.userId;
                    
                    var organizationIdValue = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                    
                
                    
                    var params = {
                        TableName:"Organizations",
                        Item:{
                            userId : userIdValue,
                            organizationId : organizationIdValue,
                            name : nameValue
                        }
                    };
                    
                    this.props.dbPut(params, function(result){ 
                      myThis.props.handleLoadOrganization(organizationIdValue, nameValue);
                      myThis.props.history.push('loadorganizations');
                    });
          
          
        } else {
          // organizations exist.  users just logged in a moment ago.  need to load top org
          var organizationId = organizations[0].organizationId;
          var organizationName = organizations[0].name;
          this.props.handleLoadOrganization(organizationId, organizationName)
        }     
    }
  }
  
  componentWillUpdate() {
    // this is where code goes to pull data from DB for this org
    this.props.history.push('campaigns');  
    
    
  }
  

  render() {
    return (
      <div>
          <i className='fa fa-circle-o-notch fa-spin'></i> Loading {this.state.organizationName}
      </div>
    );
  }


}

export default LoadOrganizationComponent;