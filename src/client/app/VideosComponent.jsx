import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

class VideosComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    var videos = this.props.videos;
    if (videos === 'not found') {
      this.props.handleLoadNext('videos');
      this.props.history.push('loadvideos');
    }
  }

  render() {
    var videos = this.props.videos;
    var handleLoadVideo = this.props.handleLoadVideo;
    var history = this.props.history;

    var videosJsx = function () { return '' }();

    if (videos !== 'not found') {
      if (videos.length === 0) {
        videosJsx = function () { return 'No videos uploaded yet.' }();

      } else {
        videosJsx = videos.map((video, i) => {
          return <Video video={video} handleLoadVideo={handleLoadVideo} history={history} />
        });
      }
    }

    // var organizationMenu = function() {return <OrganizationMenuComponent current="videos" /> }();
    var appMenu = function () { return <AppMenuComponent current="videos" /> }();


    return (

      <div className="videos-container">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <h3 className="page_header_title float-left">Videos</h3>
                <div className="page_header_action float-right">
                  <Link to={`uploadvideo`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Add Video</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <div className="row">
              {videosJsx}
            </div>

            <br />

          </div>

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

    return (

      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

        <div id="video_component" className="" onClick={this.handleSelectVideo.bind(this, this.props.video)}>
          <div className="dragonfly-card">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{this.props.video.name}</h5>
                <h6 className="card-subtitle mb-2"><i className={statusIconClassName}></i> {status}</h6>

                <div className="card-action-links">
                  <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a>
                  <a className="card-link link-video-edit"><i className="far fa-dot-circle"></i> Breakpoints</a>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>


      // <div onClick={this.handleSelectVideo.bind(this, this.props.video)} className="dragon-select-list-row dragon-pointer">
      //   <div className="dragon-select-list-cell">
      //     <i className='fa fa-file-video-o fa-fw fa-lg'></i>
      //   </div>
      //   <div className="dragon-select-list-cell">
      //     {this.props.video.name}
      //   </div>
      //   <div className="dragon-select-list-cell">
      //     <i className={statusIconClassName}></i>
      //     &nbsp;
      //       {status}
      //   </div>
      // </div>
    );
  }

  handleSelectVideo(video) {
    this.props.handleLoadVideo(video);
    this.props.history.push('video');
  }

}




export default VideosComponent;
