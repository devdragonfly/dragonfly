import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


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

    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();

    return (


        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>

                <br/><br/>

                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Campaign

          </div>

        </div>



    );
  }


}

export default LoadResultsComponent;
