import React from 'react';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

class LoadSessionsComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var myThis = this;
    var organizationId = this.props.organizationId;
    
    var params = {
        TableName : "Sessions",
        KeyConditionExpression: "#organizationId = :organizationId",
        ExpressionAttributeNames:{
            "#organizationId": "organizationId"
        },
        ExpressionAttributeValues: {
            ":organizationId":organizationId
        }
    };

    this.props.dbQuery(params, function(result) {
      // var next = myThis.props.next;
      myThis.props.handleLoadSessions(result);
      // myThis.props.history.push(next);

      
      myThis.props.history.push(myThis.props.next);   
      
    });
    
    
  }


  render() {
    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();
    return (
      <div id="loadSessionsComponent" className="page-loader-container">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading Sessions...</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }



}

export default LoadSessionsComponent;