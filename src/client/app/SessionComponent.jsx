import React from 'react';
import { Link } from 'react-router';
import BreakpointComponent from './BreakpointComponent.jsx';
import MillisecondsComponent from './MillisecondsComponent.jsx';


import AppMenuComponent from './components/base/AppMenuComponent.jsx';


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

    this.state = {
      seconds: 0,
      currentThumbnailUrl: currentThumbnailUrl,
      thumbnails: thumbnails,
      buttonRestClassName: buttonClassName,
      buttonClickedClassName: "dragon-hidden"
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

    var breakpointsJsx = function () { return '' }();


    var thumbnailUrl = "./images/video-play.jpg";
    var second = 0;

    if (breakpoints == null) {
      breakpointsJsx = function () { return 'No breakpoints added to this session yet.' }();
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
          handleLoadQuestion={handleLoadQuestion} history={history} />;
      });

    }

    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();
    var millisecondsJsx = function () { return <MillisecondsComponent milliseconds={milliseconds} /> }();

    console.log("RENDERING Session: ");
    console.log(session);

    var breakpointsCount = 0;
    if (session.breakpoints) {
      breakpointsCount = session.breakpoints.length;
    }
    return (

      <div id="viewSessionsComponent">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">


            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">Edit Session: {this.props.session.name}</h3>
                  <p><b>Breakpoints: </b> {breakpointsCount}</p>
                </div>

                <div className="page_header_action float-right">
                  <a className="btn btn-primary float-right"><i className='fa fa-plus'></i> Add Breakpoint</a>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-6 campaign-cards-container float-left">

                <div id="sessionViewBreakpointComponent" className="">
                  <div className="dragonfly-card">
                    <div className="card">
                      <div className="card-body">

                        <h5 className="card-title">Add Breakpoint</h5>
                        {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

                        <div className="session-add-breakpoint">
                          <div className="row">
                            <div className="col session-add-breakpoint-viewer">
                              <img src={this.state.currentThumbnailUrl} />
                              <div className="session-breakpoint-video-footer">
                                <h6 className="session-breakpoint-video-title">{this.props.session.video.name} <Link to={'selectvideo'}><i className='fa fa-edit fa-fw'></i></Link></h6>
                                <p className="session-breakpoint-video-timer">{millisecondsJsx}</p>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col session-add-breakpoint-questions">
                              <div className="dragon-select-list">

                                <form onSubmit={this.handleSubmit}>
                                  <input type="range" min="0" max={thumbnails.length} step="0.5" value={this.state.seconds} onChange={this.updateSeconds} />
                                  <br />

                                  <input type="submit" className={this.state.buttonRestClassName} value="Add Breakpoint" />
                                  <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Breakpoint</div>
                                </form>


                              </div>

                            </div>
                          </div>


                        </div>

                        <div className="card-action-links">
                          <br/>
                          {/* <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Save Breakpoint</a> */}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 campaign-cards-container float-right">

                <div id="sessionBreakpointsComponent" className="">
                  <div className="dragonfly-card">
                    <div className="card">
                      <div className="card-body">

                        <h5 className="card-title">All Breakpoints</h5>
                        {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

                        <div className="dragon-breakpoints">
                          {breakpointsJsx}
                        </div>

                        {/* <div className="card-action-links">
          <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
          <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Breakpoints ({this.props.breakpointCount})</a>
        </div> */}

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>



          </div>
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

    var breakpointId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });



    var breakpoint = { breakpointId: breakpointId, milliseconds: milliseconds };
    var breakpoints = [];

    if (this.props.session.breakpoints != null) {
      breakpoints = this.props.session.breakpoints;
    }

    breakpoints.push(breakpoint);

    var params = {
      TableName: "Sessions",
      Key: {
        organizationId: organizationId,
        sessionId: sessionId
      },
      UpdateExpression: "set breakpoints = :breakpoints",
      ExpressionAttributeValues: {
        ":breakpoints": breakpoints
      },
      ReturnValues: "UPDATED_NEW"
    };


    this.props.dbUpdate(params, function (result) {
      myThis.showClickedButtonState(false);
      session.breakpoints = breakpoints;
      myThis.props.handleLoadSession(session);
    });

  }






}



export default SessionComponent;
