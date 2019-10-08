import React from 'react';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

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
    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();
    return (
      <div id="loadSessionsComponent" className="page-loader-container">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading {this.props.session.name}...</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }


}






export default LoadThumbnailsComponent;