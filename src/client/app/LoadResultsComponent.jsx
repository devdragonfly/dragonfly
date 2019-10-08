import React from 'react';
import AppMenuComponent from './components/base/AppMenuComponent.jsx';



class LoadResultsComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    var myThis = this;
    var campaign = this.props.campaign;
    var campaignId = campaign.campaignId;

    var params = {
        TableName : "Results",
        KeyConditionExpression: "#campaignId = :campaignId",
        ExpressionAttributeNames:{
            "#campaignId": "campaignId"
        },
        ExpressionAttributeValues: {
            ":campaignId":campaignId
        }
    };

    this.props.dbQuery(params, function(result) {
      myThis.props.handleLoadResults(result);
      myThis.props.history.push('campaign');

    });


  }

  render() {

    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();


    return (

      <div id="loadCompaignComponent" className="page-loader-container">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading Campaign...</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    );
  }


}

export default LoadResultsComponent;
