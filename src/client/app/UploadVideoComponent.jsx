import React from 'react';
import { Link } from 'react-router';
import AppMenuComponent from './components/base/AppMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class UploadVideoComponent extends React.Component {

  constructor(props) {
    super(props);

    var videoId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    this.state = {
      file: null,
      nameValue: '',
      buttonRestClassName: buttonClassName,
      buttonClickedClassName: "dragon-hidden",
      videoId: videoId
    };
    this.updateNameValue = this.updateNameValue.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.videoUploadFailedCallback = this.videoUploadFailedCallback.bind(this);
    this.videoUploadedCallback = this.videoUploadedCallback.bind(this);
    this.updateVideoUploadStatus = this.updateVideoUploadStatus.bind(this);

  }

  render() {

    var appMenu = function () { return <AppMenuComponent current="sessions" /> }();


    return (


      <div id="uploadVideoComponent">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">


            {/* PAGE HEADER */}
            <div className="row page_header_container">
              <div className="col-12">

                <div className="page_header_title float-left">
                  <h3 className="page-title">Upload a Video</h3>
                </div>

                <div className="page_header_action float-right">
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>


            <form ref='uploadForm' onSubmit={this.handleSubmit}>

              <br />
              <input value={this.state.nameValue} onChange={this.updateNameValue} className="form-control" placeholder="name of video" />

              <br />

              <input type="file" onChange={this.handleFile} className="form-control" placeholder="video file" />

              <br />

              <input type="submit" className={this.state.buttonRestClassName} value="Upload" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Uploading</div>
            </form>


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

  updateNameValue(e) {
    this.setState({
      nameValue: e.target.value
    });
  }

  handleFile(e) {
    var file = e.target.files[0];
    this.setState({ file: file });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const nameValue = this.state.nameValue.trim();
    const organizationId = this.props.organizationId;
    const videoId = this.state.videoId;
    var videos = this.props.videos;
    var file = this.state.file;

    if (nameValue == null) {
      this.showClickedButtonState(false);
      alert("Please enter a name for your video.");
      return;
    }

    if (file == null) {
      this.showClickedButtonState(false);
      alert("Please select a file");
      return;
    }

    var utc = new Date().getTime();

    var params = {
      TableName: "Videos",
      Item: {
        organizationId: organizationId,
        videoId: videoId,
        name: nameValue,
        uploadStatus: 'Uploading',
        utc: utc
      }
    };

    this.props.s3Upload(file, videoId, myThis.videoUploadFailedCallback, myThis.videoUploadedCallback, nameValue);

    this.props.dbPut(params, function (result) {
      myThis.showClickedButtonState(false);
      myThis.props.history.push('loadvideos');
    });

  }

  videoUploadFailedCallback() {
    this.updateVideoUploadStatus("Upload Failed");
  }

  videoUploadedCallback() {
    this.updateVideoUploadStatus("Processing");
  }

  updateVideoUploadStatus(uploadStatus) {
    var myThis = this;
    const organizationId = this.props.organizationId;
    const videoId = this.state.videoId;
    var utc = new Date().getTime();
    var params = {
      TableName: "Videos",
      Key: {
        organizationId: organizationId,
        videoId: videoId
      },
      UpdateExpression: "set uploadStatus = :uploadStatus, utc = :utc",
      ExpressionAttributeValues: {
        ":uploadStatus": uploadStatus,
        ":utc": utc
      },
      ReturnValues: "UPDATED_NEW"
    };


    this.props.dbUpdate(params, function (result) {
      myThis.props.handleVideoStatusUpdate(videoId, uploadStatus);
    });
  }

}




export default UploadVideoComponent;
