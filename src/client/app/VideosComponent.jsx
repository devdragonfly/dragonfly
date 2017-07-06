import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class VideosComponent extends React.Component {

  constructor(props) {
    super(props);

  }
  
  componentWillMount() {
    var videos = this.props.videos;
    if (videos === 'not found') {
      this.props.history.push('loadvideos');
    }
  }

  render() {
    var videos = this.props.videos;
    var handleLoadVideo = this.props.handleLoadVideo;
    var history = this.props.history;
    
    var videosJsx = function() {return '' }();
    
    if (videos !== 'not found') {
          if (videos.length === 0) {
            videosJsx = function() {return 'No videos uploaded yet.' }();
            
          } else {
            videosJsx = videos.map((video, i) => {
                return <Video video={video} handleLoadVideo={handleLoadVideo} history={history}/>
            });
          }
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="videos" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3>
              Videos
            </h3>
            
            
            <div className="dragon-select-list">
              {videosJsx}
            </div>
            
            <br/>
            
            <Link to={`uploadvideo`} className="btn btn-primary"><i className='fa fa-plus'></i> Upload Video</Link>
            
          </div>
          <div className="col-sm-4">
          </div>
        </div>



    );
  }


}





class Video extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var status = this.props.video.uploadStatus;
    var statusIconClassName = "fa fa-check";
    
    var dt = new Date();
    var utc = dt.getTime();
    var utcVideo = this.props.video.utc;
    if (utcVideo == null) utcVideo = 1451635200000;
    var utcDelta = utc - utcVideo;
    
    if (utcDelta > 1000000) {
      if (status === "Uploading") { status = "Upload Failed"; statusIconClassName = "fa fa-warning"; }
    }
    
    
    if (status === "Uploading") {
      statusIconClassName='fa fa-circle-o-notch fa-spin';
    }
    
    return (
        <div onClick={this.handleSelectVideo.bind(this, this.props.video)} className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-file-video-o fa-fw fa-lg'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.video.name}
          </div>
          <div className="dragon-select-list-cell">
            <i className={statusIconClassName}></i>
            &nbsp;
            {status}
          </div>
        </div>
    );
  }
  
  handleSelectVideo(video) {
    this.props.handleLoadVideo(video);
    this.props.history.push('video');
  }

}




export default VideosComponent;