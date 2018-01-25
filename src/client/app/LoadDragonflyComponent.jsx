import React from 'react';

class LoadDragonflyComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    var myThis = this;
    var dragonflyId = this.props.dragonflyId;
    
    var params = {
        TableName : "Dragonflies",
        KeyConditionExpression: "#dragonflyId = :dragonflyId",
        ExpressionAttributeNames:{
            "#dragonflyId": "dragonflyId"
        },
        ExpressionAttributeValues: {
            ":dragonflyId":dragonflyId
        }
    };

    this.props.dbQueryUnauth(params, function(result) {
      myThis.props.handleLoadDragonfly(result);
      myThis.props.history.push('play');    
      
    });
    
    
  }
  

  render() {
    
    return (

      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
              <i className='fa fa-circle-o-notch fa-spin'></i> Loading Dragonfly
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      
      
      
    );
  }


}

export default LoadDragonflyComponent;