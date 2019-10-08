import React from 'react';
import { Link } from 'react-router';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class VideoComponent extends React.Component {

  constructor(props) {
    super(props);

    var videoId = this.props.video.videoId;
    // alert(videoId);
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
    var appMenu = function () { return <AppMenuComponent current="videos" /> }();

    var videoId = this.props.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4";

    return (

      <div id="viewVideoComponent">
        {appMenu}

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <h3 className="page_header_title float-left">{this.props.video.name}</h3>
                <div className="page_header_action float-right">

                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>

            <video
              id="my-player"
              controls
              preload="auto"
              data-setup='{}'>
              <source src={videoUrl} type="video/mp4"></source>
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
              </p>
            </video>

          </div>

        </div>

      </div>



    );
  }


}



export default VideoComponent;