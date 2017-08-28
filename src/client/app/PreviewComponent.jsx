import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class PreviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClipDone = this.handleClipDone.bind(this);
    
  }

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    var videoId = this.props.session.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4" + "#t=30,35";
    var thumbnailUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/" + this.props.session.thumbnails[0].Key;
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
            <br/>
            PREVIEW SESSION:
            <br/>
            <video
                id="my-player"
                class="video-js"
                preload="auto"
                poster={thumbnailUrl}
                data-setup='{}'
                onClick={this.handleClickPlay}>
              <source src={videoUrl} type="video/mp4"></source>
              <p class="vjs-no-js">
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
  
  
  handleClickPlay(e) {
    var myThis = this;
    var video = e.target;
    e.target.play();
    e.target.onpause = function() {
      myThis.handleClipDone(video);
    };
    
  }
  
  handleClipDone(video) {
    video.style.display = "none";
    
    // show question
    
    
  }


}



export default PreviewComponent;