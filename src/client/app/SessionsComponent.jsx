import React from 'react';
import { Link } from 'react-router';
import AppMenuComponent from './components/base/AppMenuComponent.jsx';

class SessionsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    var sessions = this.props.sessions;
    if (sessions === 'not found') {
      this.props.handleLoadNext('sessions');
      this.props.history.push('loadsessions');
    }
  }

  render() {
    var sessions = this.props.sessions;
    var handleLoadSession = this.props.handleLoadSession;
    var history = this.props.history;

    var sessionsJsx = function () { return '' }();

    if (sessions !== 'not found') {
      if (sessions.length === 0) {
        sessionsJsx = function () { return 'No sessions created yet.' }();

      } else {
        var breakpointCount = 0;
        sessionsJsx = this.props.sessions.map((session, i) => {
          breakpointCount = 0;
          if (session.breakpoints != null) {
            breakpointCount = session.breakpoints.length;
          }
          return <Session session={session} handleLoadSession={handleLoadSession} breakpointCount={breakpointCount} history={history} />
        });
      }
    }

    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();


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
                      <Link className="page-section-header-link btn btn-sm" to={`videos`}> View All (0)</Link>
                    </div>

                    <div className="clearfix"></div>
                  </div>
                </div>

                {/* Video Slider */}
                <div className="row">

                  <div className="col-12 video-slider-container">
                    {/* Video Slider Item - Add New */}
                    <div className="video-slider-card">
                      <div className="video-slider-item video-slider-item-create">
                        <div className="video-slider-body">

                          <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
                          <Link to={`uploadvideo`} className=""><i className='fa fa-plus'></i></Link>
                            {/* <i className="fa fa-plus"></i> */}
                          </div>
                          {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

                          {/* <div className="card-action-links">
                          <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
                          <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Breakpoints ({this.props.breakpointCount})</a>
                        </div> */}

                        </div>
                      </div>
                    </div>

                    {/* Video Slider Item - Video Icon */}
                    <div className="video-slider-card">
                      <div className="video-slider-item">
                        <div className="video-slider-body">

                          <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
                            <i className="fas fa-play"></i>
                          </div>
                          {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

                          {/* <div className="card-action-links">
                          <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
                          <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Breakpoints ({this.props.breakpointCount})</a>
                        </div> */}

                        </div>
                      </div>
                    </div>

                    {/* Video Slider Item - Video Icon */}
                    <div className="video-slider-card">
                      <div className="video-slider-item">
                        <div className="video-slider-body">

                          <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
                            <i className="fas fa-play"></i>
                          </div>
                          {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

                          {/* <div className="card-action-links">
                          <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
                          <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Breakpoints ({this.props.breakpointCount})</a>
                        </div> */}

                        </div>
                      </div>
                    </div>

                    {/* Video Slider Item - Video Icon */}
                    <div className="video-slider-card">
                      <div className="video-slider-item">
                        <div className="video-slider-body">

                          <div className="video-slider-hover-action-icon justify-content-cetner align-items-center">
                            <i className="fas fa-play"></i>
                          </div>
                          {/* <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6> */}

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

            <div className="row">
              <div className="col-12">
                {/* Section Header */}
                <div className="row page-section-header-container">
                  <div className="col-12">

                    <div className="page-section-header float-left">
                      <h6 className="page-section-title">Saved Dragonflies</h6>
                    </div>

                    <div className="page-section-header-actions float-right">
                      {/* <i className="fa fa-plus"></i> */}
                    </div>

                    <div className="clearfix"></div>
                  </div>
                </div>

                <div className="clearfix"></div>
                <div className="row">
                  {sessionsJsx}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }


}





class Session extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (


      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

        <div id="sessionCardComponent" className="" onClick={this.handleSelectSession.bind(this, this.props.session)}>
          <div className="dragonfly-card">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.props.session.name}</h5>
                <h6 className="card-subtitle mb-0"><i className="fas fa-film"></i> Testing Video</h6>
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
