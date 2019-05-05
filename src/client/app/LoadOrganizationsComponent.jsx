import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class LoadOrganizationsComponent extends React.Component {

  constructor(props) {
    console.log('LoadOrganizationsComponent constructor');
    super(props);
  }

  componentDidMount() {
    var myThis = this;
    var userId = this.props.userId;
    console.log('userIduserIduserIduserId', userId);
    var params = {
        TableName : "Organizations",
        KeyConditionExpression: "#userId = :userId",
        ExpressionAttributeNames:{
            "#userId": "userId"
        },
        ExpressionAttributeValues: {
            ":userId":userId
        }
    };

    this.props.dbQuery(params, function(result) {
      console.log('dbQuery result', result);
      myThis.props.handleLoadOrganizations(result);
      myThis.props.history.push('loadorganization');

    });


  }


  render() {
    return (
      <div className="row dragon-navbar">
        <div className="col-sm-6">
            <div className="dragon-org-menu">
              <div className="dragon-org-name"><i className='fa fa-circle-o-notch fa-spin'></i> Loading</div>
            </div>
        </div>
        <div className="col-sm-6">

        </div>
      </div>




    );
  }


}

export default LoadOrganizationsComponent;
