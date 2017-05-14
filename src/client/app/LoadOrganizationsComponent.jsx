import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class LoadOrganizationsComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var myThis = this;
    var userId = this.props.userId;
    
    var params = {
        TableName : "Organizations",
        KeyConditionExpression: "#userid = :userid",
        ExpressionAttributeNames:{
            "#userid": "userid"
        },
        ExpressionAttributeValues: {
            ":userid":userId
        }
    };

    this.props.dbQuery(params, function(result) {
      myThis.props.handleLoadOrganizations(result);
      myThis.props.history.push('loadorganization');    
      
    });
    
    
  }
  

  render() {
    return (
      <div>
          <i className='fa fa-circle-o-notch fa-spin'></i> Loading Organizations
      </div>
    );
  }


}

export default LoadOrganizationsComponent;