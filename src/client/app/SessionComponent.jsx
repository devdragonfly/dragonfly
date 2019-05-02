import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import BreakpointComponent from './BreakpointComponent.jsx';
import MillisecondsComponent from './MillisecondsComponent.jsx';


const buttonClassName = "btn btn-primary";

class SessionComponent extends React.Component {

  constructor(props) {
    super(props);

    var thumbnails = [];
    var currentThumbnailUrl = "./images/video-play.jpg";

    if (props.session.thumbnailState === "loaded") {
      thumbnails = props.session.thumbnails;
      var key = thumbnails[0].Key;
      currentThumbnailUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/" + key;
    }

    this.state = {seconds : 0,
                  currentThumbnailUrl: currentThumbnailUrl,
                  thumbnails: thumbnails,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateSeconds = this.updateSeconds.bind(this);
    this.updateCurrentThumbnailUrl = this.updateCurrentThumbnailUrl.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var preview = { currentTime: 0, results: [] };
    props.handleLoadPreview(preview);
  }


  componentWillMount() {
    var video = this.props.session.video;
    if (video.videoId == "not found") {
      this.props.history.push('selectvideo');
    }


    var thumbnailState = this.props.session.thumbnailState;
    if (thumbnailState === "unknown") {
      this.props.handleLoadNext('session');
      this.props.history.push('loadthumbnails');
    }
  }


  render() {
    var myThis = this;
    var dbUpdate = this.props.dbUpdate;
    var handleLoadSession = this.props.handleLoadSession;
    var organizationId = this.props.organizationId;
    var session = this.props.session;
    var breakpoints = this.props.session.breakpoints;
    var history = this.props.history;
    var milliseconds = this.state.seconds * 1000;
    var handleLoadBreakpoint = this.props.handleLoadBreakpoint;
    var handleLoadQuestion = this.props.handleLoadQuestion;
    var thumbnails = this.state.thumbnails;

    var breakpointsJsx = function() {return '' }();


    var thumbnailUrl = "./images/video-play.jpg";
    var second = 0;

    if (breakpoints == null){
      breakpointsJsx = function() {return 'No breakpoints added to this session yet.' }();
    } else {
      breakpointsJsx = breakpoints.map((breakpoint, i) => {
          if (thumbnails.length !== 0) {
            second = Math.round(breakpoint.milliseconds / 1000);
            if (second >= thumbnails.length - 1) { second = thumbnails.length - 1; }
            var key = thumbnails[second].Key;
            thumbnailUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/" + key;
          }

          return <BreakpointComponent organizationId={organizationId} dbUpdate={dbUpdate} handleLoadSession={handleLoadSession}
                                      session={session} breakpoint={breakpoint} thumbnailUrl={thumbnailUrl}
                                      handleLoadBreakpoint={handleLoadBreakpoint}
                                      handleLoadQuestion={handleLoadQuestion} history={history}/>;
      });

    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    var millisecondsJsx = function() {return <MillisecondsComponent milliseconds={milliseconds} /> }();

    return (

        <div className="row">
          {organizationMenu}



          <div className="col-sm-6">

                <h3><i className='fa fa-graduation-cap fa-fw'></i> {this.props.session.name}</h3>

                <div className="dragon-breakpoints">
                  {breakpointsJsx}
                </div>

                <br/><br/>


                <div className="dragon-breakpoint">
                  <div className="dragon-breakpoint-info">
                    <img src={this.state.currentThumbnailUrl}/>
                    <br/>
                    {millisecondsJsx}
                    <br/>
                  </div>
                  <div className="dragon-breakpoint-questions">
                    <div className="dragon-select-list">
                      {this.props.session.video.name}
                      &nbsp;
                      <Link to={'selectvideo'}><i className='fa fa-edit fa-fw'></i></Link>


                      <form onSubmit={this.handleSubmit}>
                          <input type="range" min="0" max={thumbnails.length} step="0.5" value={this.state.seconds} onChange={this.updateSeconds}/>
                          <br/>

                        <input type="submit" className={this.state.buttonRestClassName} value="Add Breakpoint" />
                        <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Breakpoint</div>
                      </form>


                    </div>

                  </div>
                </div>


          </div>


          <div className="col-sm-4">
          </div>

        </div>



    );
  }

  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
    }
  }

  updateSeconds(e) {
    this.setState({
      seconds: e.target.value
    });
    var thumbnails = this.state.thumbnails;
    if (thumbnails.length > 0) {
      var second = Math.round(e.target.value);
      var key = thumbnails[second].Key;
      var thumbnailUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/" + key;
      this.updateCurrentThumbnailUrl(thumbnailUrl);
    }
  }


  updateCurrentThumbnailUrl(currentThumbnailUrl) {
    this.setState({
      currentThumbnailUrl: currentThumbnailUrl
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const milliseconds = this.state.seconds * 1000;
    const organizationId = this.props.organizationId;
    const sessionId = this.props.session.sessionId;
    var session = this.props.session;

    var breakpointId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });



    var breakpoint = { breakpointId: breakpointId, milliseconds : milliseconds};
    var breakpoints = [];

    if (this.props.session.breakpoints != null) {
      breakpoints = this.props.session.breakpoints;
    }

    breakpoints.push(breakpoint);

    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set breakpoints = :breakpoints",
            ExpressionAttributeValues:{
                ":breakpoints" : breakpoints
            },
            ReturnValues:"UPDATED_NEW"
        };


    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      session.breakpoints = breakpoints;
      myThis.props.handleLoadSession(session);
    });

  }






}



export default SessionComponent;
