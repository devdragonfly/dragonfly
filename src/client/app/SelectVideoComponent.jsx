import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class SelectVideoComponent extends React.Component {

  constructor(props) {
    super(props);
    
    var videoId = props.session.videoId;

    this.state = {videoId: videoId,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateVideoId = this.updateVideoId.bind(this);
  }
  
  componentWillMount() {
    var videos = this.props.videos;
    if (videos === 'not found') {
      this.props.handleLoadNext('selectvideo');
      this.props.history.push('loadvideos');
    }
  }
  

  render() {
    var videos = this.props.videos;
    
    var videoOptions = function() {return '' }();

    if (videos !== 'not found') {
          if (videos.length === 0) {
            videoOptions = function() {return 'No videos uploaded yet.' }();
            
          } else {
            videoOptions = videos.map((video, i) => {
                return <VideoOption video={video}/>;
            });
          }
    }


    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();

    return (

        <div className="row">
          {organizationMenu}
          
          
          
          <div className="col-sm-4">
            <form onSubmit={this.handleSubmit}>
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <br/><br/>
                
                <select className="form-control" onChange={this.updateVideoId}>
                  {videoOptions}
                </select>
                
                <br/>

                
              <input type="submit" className={this.state.buttonRestClassName} value="Save" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving</div>
            </form>
            
          </div> 
          
          
          <div className="col-sm-6">
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
  
  
  updateVideoId(e) {
    this.setState({
      videoId: e.target.value
    });
  }
  

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    
    const organizationId = this.props.organizationId;
    const sessionId = this.props.session.sessionId;
    var session = this.props.session;
    var videos = this.props.videos;
    var videoId = this.state.videoId;
    var video = "not found";
    
    for (var i = 0; i < videos.length; i++) {
          if(videos[i].videoId === videoId) { video = videos[i] }
    }
   
    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set video = :video",
            ExpressionAttributeValues:{
                ":video" : video
            },
            ReturnValues:"UPDATED_NEW"
        };
    

    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      session.video = video;
      session.thumbnailState = "unknown";
      myThis.props.handleLoadSession(session);
      myThis.props.handleLoadVideo(video);
      myThis.props.history.push('session');
    });
    
  }

}



class VideoOption extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <option value={this.props.video.videoId} name={this.props.video.name}>{this.props.video.name}</option>
    );
  }

}





export default SelectVideoComponent;