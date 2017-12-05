import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class LoadCampaignsComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var myThis = this;
    var organizationId = this.props.organizationId;
    
    var params = {
        TableName : "Campaigns",
        KeyConditionExpression: "#organizationId = :organizationId",
        ExpressionAttributeNames:{
            "#organizationId": "organizationId"
        },
        ExpressionAttributeValues: {
            ":organizationId":organizationId
        }
    };

    this.props.dbQuery(params, function(result) {
      myThis.props.handleLoadCampaigns(result);
      myThis.props.history.push('campaigns');    
      
    });
    
    
  }
  

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    
    return (

      
        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3>Campaigns</h3>
                
                <br/><br/>
                
                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Campaigns
                
          </div> 
          
        </div>
      
      
      
    );
  }


}

export default LoadCampaignsComponent;