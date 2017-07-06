import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


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
      myThis.props.handleLoadVideos(result);
      myThis.props.history.push('videos');    
      
    });
    
    
  }
  

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="videos" /> }();
    
    return (

      
        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3>Videos</h3>
                
                <br/><br/>
                
                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Videos
                
          </div> 
          
        </div>
      
      
      
    );
  }


}

export default LoadVideosComponent;