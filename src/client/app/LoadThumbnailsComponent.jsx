import React from 'react';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class LoadThumbnailsComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {progress:["BEGINNING"]
    };
    
    this.addProgress = this.addProgress.bind(this);

  }
  
  addProgress(message) {
    var progress = this.state.progress;
    progress.push(message);
    this.setState({
      progress: progress
    });
  }
  
  componentDidMount() {
    var myThis = this;
    myThis.addProgress("inside componentDidMount");
    var next = myThis.props.next;
    myThis.addProgress("next = " + next);
    var session = myThis.props.session;
    myThis.addProgress("session = " + JSON.stringify(session));
    
    var video = session.video;
    
    myThis.addProgress("video = " + JSON.stringify(video));
    
    var prefix = video.videoId + '/';
    
    myThis.addProgress("prefix = " + prefix);
    
    var params = {
         Bucket: 'dragonfly-videos-thumbnails',
         Delimiter: '/',
         Prefix: prefix
    };
    
    myThis.addProgress("parames = " + JSON.stringify(params));
    
    this.props.s3ListObjects(params, function(err, data) {
      if (err) {
        alert(JSON.stringify(err));
        
        myThis.addProgress("error thrown during list objects");
        myThis.addProgress(JSON.stringify(err));
        
        session.thumbnailState = "none";
        myThis.props.handleLoadSession(session);
        myThis.props.history.push(next);        
        
      }
      var thumbnails = data.Contents;
      
      
      
      session.thumbnails = thumbnails;
      session.thumbnailState = "loaded";
      
      myThis.addProgress("thumbnails loaded");
      
      myThis.props.handleLoadSession(session);
      
      myThis.addProgress("session updated");
      
      myThis.props.history.push(next);
      
    });
  }
  

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    var progress = this.state.progress;
    
    var progressLog = progress.map((message, i) => {
      return <Message message={message}/>;
    });
    
    return (

      
        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <br/><br/>
                
                <i className='fa fa-circle-o-notch fa-spin'></i> Loading Thumbnails
                
                <br/><br/>
                Hi Ridley, let this page run for a few minutes, and then take a screenshot and send to me.
                <br/>
                The log below will help me figure out what's failing.  Thanks.  Chris.
                <br/><br/>
                {progressLog}
                
          </div> 
          
        </div>
      
      
      
    );
  }

}


class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <span>{this.props.message}<br/></span>
    );
  }

}




export default LoadThumbnailsComponent;