import React from 'react';
import { Link } from 'react-router';
import AppMenuComponent from './components/base/AppMenuComponent.jsx';

// import BuildNewDragonflyModal from './components/modals/BuildNewDragonflyModal.jsx';

class SessionsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.searchInput = this.searchInput.bind(this);

  }



  
  componentWillMount() {
    console.log("Loading Builder Page");

    var myThis = this;
    var organizationId = this.props.organizationId;

    this.state = {
      allSessions: [],
      loadedSessions: [],
      searchInput: ''
    }


    var videoParams = {
      TableName: "Videos",
      KeyConditionExpression: "#organizationId = :organizationId",
      ExpressionAttributeNames: {
        "#organizationId": "organizationId"
      },
      ExpressionAttributeValues: {
        ":organizationId": organizationId
      }
    };

    this.props.dbQuery(videoParams, function (result) {
      myThis.props.handleLoadVideos(result);
      console.log("Finished Loading Videos");
    });


    var sessionParams = {
      TableName: "Sessions",
      KeyConditionExpression: "#organizationId = :organizationId",
      ExpressionAttributeNames: {
        "#organizationId": "organizationId"
      },
      ExpressionAttributeValues: {
        ":organizationId": organizationId
      }
    };


    var sessions = this.props.sessions;
    if (sessions === 'not found') {
      this.props.history.push('loadsessions');
      // this.props.dbQuery(sessionParams, function (result) {
      //   myThis.props.handleLoadSessions(result);
      //   console.log("Finished Loading Sessions");
      //   myThis.setState({
      //     allSessions: myThis.props.sessions,
      //     loadedSessions: myThis.props.sessions,
      //     searchInput: ''
      //   });
      // });
    }

    this.setState({
      allSessions: this.props.sessions,
      loadedSessions: this.props.sessions,
      searchInput: ''
    });



    console.log("Sessions Props");
    console.log(this.props);
    console.log("Sessions State");
    console.log(this.state);

  }


  searchInput(event) {
    console.log("Searching...: ");
    console.log(event.target.value);

    this.setState({ searchInput: event.target.value});
    this.setState({ loadedSessions: this.state.allSessions.filter(function(session) {
      var sessionName = session.name.toLowerCase();
      return sessionName.indexOf(event.target.value.toLowerCase()) > -1; 
    })});
    console.log(this.state);
  }

  render() {

    var videos = this.props.videos;
    var handleLoadVideo = this.props.handleLoadVideo;
    // var history = this.props.history;

    var sessions = this.props.sessions;
    var handleLoadSession = this.props.handleLoadSession;
    var history = this.props.history;

    var numVideos = videos.length;

    // this.setState({allSessions: this.props.sessions});

    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();

    var videosJsx = function () { return '' }();

    if (videos !== 'not found') {
      if (videos.length === 0) {
        videosJsx = function () { return 'No videos uploaded yet.' }();

      } else {
        videosJsx = videos.map((video, i) => {
          return <VideoThumbnail video={video} handleLoadVideo={handleLoadVideo} history={history} />
        });
      }
    }


    var sessionsJsx = function () { return '' }();

    if (sessions !== 'not found') {
      if (sessions.length === 0) {
        sessionsJsx = function () { return 'No sessions created yet.' }();

      } else {
        var breakpointCount = 0;
        sessionsJsx = this.state.loadedSessions.map((session, i) => {
          console.log(session);
          breakpointCount = 0;
          if (session.breakpoints != null) {
            breakpointCount = session.breakpoints.length;
          }
          return <Session session={session} handleLoadSession={handleLoadSession} breakpointCount={breakpointCount} history={history} />
        });
      }
    }


    // var buildNewDragonflyModal = function () { return <BuildNewDragonflyModal />}();

    return (

      <div id="sessionsComponent">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            {/* PAGE HEADER */}
            <div className="row page_header_container">
              <div className="col-12">

                <div className="page_header_title float-left">
                  <h3 className="page-title">Build a Dragonfly</h3>
                  <p>Create a new Dragonfly, upload videos, or edit existing templates.</p>
                </div>

                <div className="page_header_action float-right">
                  <Link to={`createsession`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Build a Dragonfly</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div id="videosSliderHorizontalComponent" className="row">
              <div className="col-12">

                {/* Section Header */}
                <div className="row page-section-header-container">
                  <div className="col-12">

                    <div className="page-section-header float-left">
                      <h6 className="page-section-title">My Videos</h6>
                    </div>

                    <div className="page-section-header-actions float-right">
                      <Link className="page-section-header-link btn btn-sm" to={`videos`}> View All ({numVideos})</Link>
                    </div>

                    <div className="clearfix"></div>
                  </div>
                </div>

                {/* Video Slider - Add Video */}
                <div className="row">

                  <div className="col-12 video-slider-container">
                    {/* Video Slider Item - Add New */}
                    <div className="video-slider-card">
                      <div className="video-slider-item video-slider-item-create">
                        <div className="video-slider-body">

                          <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
                            <Link to={`uploadvideo`} className=""><i className='fa fa-plus'></i></Link>
                          </div>

                          <div className="video-slider-info">
                            <h5 className="video-title">Add New</h5>
                          </div>

                        </div>
                      </div>
                    </div>


                    {videosJsx}
                  </div>

                </div>


              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {/* Section Header */}
                <div className="row page-section-header-container">
                  <div className="col-12">

                    <div className="page-section-header float-left">
                      <h6 className="page-section-title">Saved Dragonflies</h6>
                    </div>

                    <div className="page-section-header-actions float-right">
                    </div>

                    <div className="clearfix"></div>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="row">
                  <div className="col-12">
                    <div className="search-container">
                      <div className="form-group search-box">
                        <input ref="searchInput" id="search-input" onChange={this.searchInput} type="text" className="form-control" placeholder="Search Dragonfly Sessions..." />
                        <button className="search-btn">
                          <i className='fa fa-search'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {sessionsJsx}
                </div>
              </div>
            </div>


            {/* Build Dragonfly Modal */}
            {/* {buildNewDragonflyModal} */}

          </div>

        </div>
      </div>

    );
  }



}

class VideoThumbnail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var status = this.props.video.uploadStatus;
    var statusIconClassName = "fas fa-spinner fa-spin";

    var dt = new Date();
    var utc = dt.getTime();
    var utcVideo = this.props.video.utc;
    if (utcVideo == null) utcVideo = 1451635200000;
    var utcDelta = utc - utcVideo;

    if (utcDelta > 1000000) {
      if (status === "Uploading") { status = "Upload Failed"; statusIconClassName = "fa fa-warning"; }
    }


    if (status === "Uploading") {
      statusIconClassName = 'fa fa-circle-o-notch fa-spin';
    }


    const imgURL = 'https://s3-us-west-2.amazonaws.com/dragonfly-videos-thumbnails/' + this.props.video.videoId + '/thumbs-' + this.props.video.videoId + '-00001.jpg';


    var divStyle = {
      backgroundImage: 'url(' + imgURL + ')'
    }

    return (

      <div className="video-slider-card">

        <div className="video-slider-item" style={divStyle} onClick={this.handleSelectVideo.bind(this, this.props.video)}>
          <div className="video-slider-body">

            <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
              <i className="fas fa-play"></i>
            </div>

            <div className="video-slider-info">
              <h5 className="video-title">{this.props.video.name}</h5>
            </div>

          </div>

        </div>



      </div>




    );
  }

  handleSelectVideo(video) {
    this.props.handleLoadVideo(video);
    this.props.history.push('video');
  }

}





class Session extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

    let videoName = "No Video Selected";
    if (this.props.session.video) {
      videoName = this.props.session.video.name;
    }

    return (


      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

        <div id="sessionCardComponent" className="" onClick={this.handleSelectSession.bind(this, this.props.session)}>
          <div className="dragonfly-card">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.props.session.name}</h5>
                <h6 className="card-subtitle mb-0"><i className="fas fa-film"></i> {videoName}</h6>
                <h7 className="card-subtitle mb-2"><i className="far fa-dot-circle"></i> {this.props.breakpointCount} Breakpoints</h7>

                <div className="card-action-links">
                  <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
                  <a className="card-link link-video-edit"><i className="fas fa-pencil-alt"></i> Edit</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  handleSelectSession(session) {
    this.props.handleLoadSession(session);
    this.props.history.push('session');
  }

}




export default SessionsComponent;
