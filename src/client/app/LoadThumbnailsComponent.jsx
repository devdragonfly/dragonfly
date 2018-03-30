import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class LoadThumbnailsComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  

  componentDidMount() {
    var myThis = this;
    var next = myThis.props.next;
    var session = myThis.props.session;
    var video = session.video;
    
    
    var prefix = video.videoId + '/';
    
    
    var params = {
         Bucket: 'dragonfly-videos-thumbnails',
         Delimiter: '/',
         Prefix: prefix
    };
    
    
    this.props.s3ListObjects(params, function(err, data) {
      if (err) {
        alert(JSON.stringify(err));

        session.thumbnailState = "none";
        myThis.props.handleLoadSession(session);
        myThis.props.history.push(next);        
        
      }
      var thumbnails = data.Contents;
      
      
      session.thumbnails = thumbnails;
      session.thumbnailState = "loaded";

      myThis.props.handleLoadSession(session);
      myThis.props.history.push(next);
      
    });
  }
  

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    
    return (

      
        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <br/><br/>
                
                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Thumbnails
                
          </div> 
          
        </div>
      
      
      
    );
  }

}






export default LoadThumbnailsComponent;