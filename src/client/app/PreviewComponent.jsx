import React from 'react';
import { Link } from 'react-router';
import ResultsComponent from './ResultsComponent.jsx';

class PreviewComponent extends React.Component {
  


  constructor(props) {
    super(props);
    
    var breakpoints = props.session.breakpoints;
    var nextPause = breakpoints[0].milliseconds;

    this.state = {
          breakpointNumber: 0,
          questionNumber: 0,
          currentTime: 0,
          nextPause: nextPause,
          results: [],
          earned: 0
    };
    
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
    this.advanceBreakpoint = this.advanceBreakpoint.bind(this);
    this.advanceQuestion = this.advanceQuestion.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    

  }
  
  componentDidMount() {
    var myThis = this;
    
    var video = document.getElementById("my-player");
    video.play();

    video.onplay = function() {
        setInterval(function(){
            myThis.handleInterval(video);
        }.bind(this), 250);
    };

    
  }



  render() {
    var results = this.state.results;
    var earned = this.state.earned;
    var resultsComponent = function() {return <ResultsComponent results={results} earned={earned} /> }();
    
    var videoId = this.props.session.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4";

    var thumbnailUrl = "./images/play.png";
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              {resultsComponent}
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">

                          <video autoplay
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
    var video = e.target;
    alert('play has been clicked');
    video.play();
  }
  
  handleInterval(video) {
    
    var nextPause = this.state.nextPause;
    var currentTime = video.currentTime * 1000;
    if (currentTime < nextPause) { return; }
    
    video.pause();
    this.showQuestion();

  }
  
 
  showQuestion() {
    var myThis = this;
    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var questionNumber = this.state.questionNumber;
    
    var breakpoint = breakpoints[breakpointNumber];
    var question = breakpoint.questions[questionNumber];
    
    alert(JSON.stringify(question));

    myThis.advanceQuestion();
  }
  
  
  
  
  advanceQuestion() {
    var myThis = this;
    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var questionNumber = this.state.questionNumber;
    
    var breakpoint = breakpoints[breakpointNumber];
    
    questionNumber = questionNumber + 1;
    
    if (questionNumber >= breakpoint.questions.length) {
      myThis.advanceBreakpoint();
      return;
    }
    
    this.setState({questionNumber : questionNumber});
    myThis.showQuestion();
    
  }
  
  
  
  
  advanceBreakpoint() {
    var myThis = this;
    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var video = document.getElementById("my-player");
    
    breakpointNumber = breakpointNumber + 1;
    
    if (breakpointNumber >= breakpoints.length) {
      this.setState({nextPause : 100000000});
      video.play();
      video.onended = function() {
        alert("video ended - save results and go to completion page");
      };
      return;
    }
    
    var nextPause = breakpoints[breakpointNumber].milliseconds;
    
    this.setState({breakpointNumber : breakpointNumber, 
                    questionNumber : 0,
                    nextPause : nextPause
    });
    
    video.play();
    
  }



}


export default PreviewComponent;