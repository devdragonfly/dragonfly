import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class VideoComponent extends React.Component {

  constructor(props) {
    super(props);
    
    var videoId = this.props.video.videoId;
    alert(videoId);
    var prefix = videoId + '/';
    var params = {
         Bucket: 'dragonfly-videos-thumbnails',
         Delimiter: '/',
         Prefix: prefix
    };
    
    this.props.s3ListObjects(params);
  }
  
  componentDidMount() {
    var myThis = this;
    
    var video = document.getElementById("my-player");
    video.play();
  }

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="videos" /> }();
    
    var videoId = this.props.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4";
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.video.name}</h3>
            <br/>
            <video
                id="my-player"
                controls
                preload="auto"
                data-setup='{}'>
              <source src={videoUrl} type="video/mp4"></source>
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
            </video>
            
          </div>
          
        </div>

    );
  }


}



export default VideoComponent;