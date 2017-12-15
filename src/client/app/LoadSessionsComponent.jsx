import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


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
      var next = myThis.props.next;
      myThis.props.handleLoadSessions(result);
      myThis.props.history.push(next);  
      
    });
    
    
  }
  

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    return (

      
        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3>Sessions</h3>
                
                <br/><br/>
                
                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Sessions
                
          </div> 
          
        </div>
      
      
      
    );
  }


}

export default LoadSessionsComponent;