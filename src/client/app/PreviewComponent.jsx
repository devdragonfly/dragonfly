import React from 'react';
import { Link } from 'react-router';
import ResultsComponent from './ResultsComponent.jsx';

class PreviewComponent extends React.Component {

  constructor(props) {

    super(props);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClipDone = this.handleClipDone.bind(this);
    
    var currentMs = props.preview.currentTime * 1000;
    var breakpoints = props.session.breakpoints;
    var breakpointsLength = breakpoints.length;
    
    var nextBreakpoint = breakpoints[0];
    var isLastBreakpoint = true;
    var totalWeight = 0;
    for (var i = 0; i < breakpointsLength; i++) {
      var breakpoint = breakpoints[i];
      
      if ((breakpoint.milliseconds > currentMs) && (breakpoint.milliseconds < nextBreakpoint.milliseconds)) {
       nextBreakpoint = breakpoints[i]; 
       isLastBreakpoint = false;
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
    var urlTime = "#t=" + startPos + "," + endPos;
    
    this.state = {
          urlTime : urlTime,
          breakpoint: nextBreakpoint,
          totalWeight: totalWeight,
          path: 'not found',
          isLastBreakpoint: isLastBreakpoint
    };

  }


  componentDidMount() {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host; 
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }

  render() {
    var results = this.props.preview.results;
    var earned = this.props.preview.earned;
    var resultsComponent = function() {return <ResultsComponent results={results} earned={earned} /> }();
    
    var videoId = this.props.session.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4" + this.state.urlTime;

    var thumbnailUrl = "./images/play.png";
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              {resultsComponent}
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">

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
              
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><div>powered by</div> <img src="./images/dragonfly-logo.png" /></div>
              </a>
              
        </div>
        <div className="col-sm-2">
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
    var isLastBreakpoint = this.state.isLastBreakpoint;
    
    if (isLastBreakpoint) {
      this.props.history.push('dragonflycomplete'); 
    } else {
      var breakpoint = this.state.breakpoint;
      var totalWeight = this.state.totalWeight;
      var preview = this.props.preview;
      var currentTime = Math.round(breakpoint.milliseconds / 1000);
      preview.currentTime = currentTime;
      preview.breakpoint = breakpoint;
      preview.totalWeight = totalWeight;
      this.props.handleLoadPreview(preview);
      this.props.history.push('previewquestion');
    }
  }


}



export default PreviewComponent;