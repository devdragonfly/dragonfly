import React from 'react';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class LoadCampaignsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myThis = this;
    var organizationId = this.props.organizationId;

    var params = {
      TableName: "Campaigns",
      KeyConditionExpression: "#organizationId = :organizationId",
      ExpressionAttributeNames: {
        "#organizationId": "organizationId"
      },
      ExpressionAttributeValues: {
        ":organizationId": organizationId
      }
    };

    this.props.dbQuery(params, function (result) {
      myThis.props.handleLoadCampaigns(result);

      //Debug Loader Timout
      // const timer = setTimeout(() => {
      //   myThis.props.history.push('campaigns');
      // }, 3000);


      myThis.props.history.push('campaigns');   
    });


  }




  render() {

    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();


    return (

      <div id="loadComapaingsComponent" className="page-loader-container">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading Campaigns...</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    );
  }


}

export default LoadCampaignsComponent;