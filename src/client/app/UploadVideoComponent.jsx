import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class UploadVideoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {file : null,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.handleFile = this.handleFile.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    return (
      
        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <form onSubmit={this.handleSubmit}>
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <br/><br/>
                
                <input type="file" onChange={this.handleFile} className="form-control input-lg" placeholder="video file"/>
                <br/>
              <input type="submit" className={this.state.buttonRestClassName} value="Upload" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Uploading</div>
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
  
  handleFile(e) {
    var file = e.target.files[0];
    this.setState({ file: file });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    
    var sessionId = this.props.session.sessionId;
    var file = this.state.file;
    
    if (file == null) {
      this.showClickedButtonState(false);
      alert("Please select a file");
    }
    
    var filename = file.name;
    var filetype = file.type;
    alert("filename: " + filename + " and filetype: " + filetype);
    
    var params = {
      Key: sessionId,
      Body: file,
      ACL: 'public-read'
    };
    
    //alert(JSON.stringify(params));
    
    this.props.s3Upload(params, function(result){
      myThis.showClickedButtonState(false);
    });
    
  }
  
  
}

export default UploadVideoComponent;