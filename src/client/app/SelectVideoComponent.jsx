import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class SelectVideoComponent extends React.Component {

  constructor(props) {
    super(props);
    
    var video = props.session.video;
    var videoId = 'not found';
    if (video != null) {
      videoId = video.videoId;
    }

    this.state = {videoId: videoId,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
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
          
          
          
          <div className="col-sm-6">
            <form onSubmit={this.handleSubmit}>
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <select className="form-control" onChange={this.updateVideo}>
                  {videoOptions}
                </select>
                
                <br/><br/>

                
              <input type="submit" className={this.state.buttonRestClassName} value="Add Breakpoint" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Breakpoint</div>
            </form>
            
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
  
  
  updateVideo(e) {
    alert(e.target.value);
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

    var video = {videoName: "video name", videoId: "video Id"}
   
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
      myThis.props.handleLoadSession(session);
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