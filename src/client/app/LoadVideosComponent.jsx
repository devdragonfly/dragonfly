import React from 'react';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

class LoadVideosComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var myThis = this;
    var organizationId = this.props.organizationId;
    
    var params = {
        TableName : "Videos",
        KeyConditionExpression: "#organizationId = :organizationId",
        ExpressionAttributeNames:{
            "#organizationId": "organizationId"
        },
        ExpressionAttributeValues: {
            ":organizationId":organizationId
        }
    };

    this.props.dbQuery(params, function(result) {
      var next = myThis.props.next;
      
      myThis.props.handleLoadVideos(result);
      myThis.props.history.push(next);    
      
    });
    
    
  }

  render() {
    var appMenu = function () { return <AppMenuComponent current="videos" /> }();
    return (
      <div id="loadVideosComponent" className="page-loader-container">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading Videos...</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  



}

export default LoadVideosComponent;