import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class PreviewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClipDone = this.handleClipDone.bind(this);
    
    var currentMs = props.preview.currentTime * 1000;
    var breakpoints = props.session.breakpoints;
    var breakpointsLength = breakpoints.length;
    var nextBreakpoint = breakpoints[0];
    var totalWeight = 0;
    for (var i = 0; i < breakpointsLength; i++) {
      var breakpoint = breakpoints[i];
      
      if ((breakpoint.milliseconds > currentMs) && (breakpoint.milliseconds < nextBreakpoint.milliseconds)) {
       nextBreakpoint = breakpoints[i]; 
      }
      
      var questions = breakpoint.questions;
      
      if (questions != null) {
          var questionsLength = questions.length;
          for (var j = 0; j < questionsLength; j++) {
            totalWeight = totalWeight + questions[j].weight;
          }        
        
      }

    }
    
    var startPos = Math.round(currentMs / 1000);
    var endPos = Math.round(nextBreakpoint.milliseconds / 1000);
    
    if (startPos >= endPos) {
      alert("session complete");
    }
    
    
    var urlTime = "#t=" + startPos + "," + endPos;
    this.state = {
          urlTime : urlTime,
          breakpoint: nextBreakpoint,
          totalWeight: totalWeight
    };
  }




  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    var videoId = this.props.session.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4" + this.state.urlTime;

    var thumbnailUrl = "./images/Loading_icon.gif";
    
    if (this.props.preview.currentTime == 0) {
      thumbnailUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/" + this.props.session.thumbnails[0].Key;
    }
    
    
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
    var breakpoint = this.state.breakpoint;
    var totalWeight = this.state.totalWeight;
    
    var currentTime = Math.round(breakpoint.milliseconds / 1000);
    var preview = { currentTime: currentTime, breakpoint: breakpoint, totalWeight: totalWeight };
    this.props.handleLoadPreview(preview);
    this.props.history.push('previewquestion');
  }


}



export default PreviewComponent;