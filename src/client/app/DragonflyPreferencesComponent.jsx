//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';


const buttonClassName = "btn btn-primary";

class DragonflyPreferencesComponent extends React.Component {

  constructor(props) {
    super(props);
    
    var dragonfly = props.dragonfly;
    
    var contact = dragonfly.contact;
    var email = contact.email;
    
    this.state = {path : "not found",
                  email : email,
                  mobile : "",
                  selectedContactOption : "email",
                  selectedInterestedOption : "yes",
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    
    this.titleCase = this.titleCase.bind(this);
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updateMobileValue = this.updateMobileValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleContactOptionChange = this.handleContactOptionChange.bind(this);
    this.handleInterestedOptionChange = this.handleInterestedOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  

  

  componentDidMount() {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host; 
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }
  
  
  

  render() {
    var dragonfly = this.props.dragonfly;
    
    var contact = dragonfly.contact;
    var first = this.titleCase(contact.first); 
    //var last = this.titleCase(contact.last); 
    var email = contact.email;
    var earned = Number(dragonfly.earned).toFixed(2);
    
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">
              <form onSubmit={this.handleSubmit}>
                <h2>Congratulations {first}!</h2>
                
                <br/>
                
                <h3>Your session is complete and you have earned ${earned}.</h3>
                
                <br/>
                
                <h3>Please enter your preferred contact information for receiving payment:</h3>
                <div className="dragon-select-list-row">
                    <div className="dragon-select-list-form-cell">
                            <div className="radio">
                              <label>
                                <input className="form-check-input" type="radio" value="email" checked={this.state.selectedContactOption === 'email'} onChange={this.handleContactOptionChange} name="group1" id="radio100"/>
                                Email to 
                              </label>
                            </div>
                    </div>  
                    <div className="dragon-select-list-form-cell">
                        <input value={this.state.email} onChange={this.updateEmailValue} className="form-control" placeholder="email address"/>
                    </div>
                </div>
                
                
                
                <div className="dragon-select-list-row">
                    <div className="dragon-select-list-form-cell">
                        <div className="radio">
                          <label>
                            <input className="form-check-input" type="radio" value="text" checked={this.state.selectedContactOption === 'text'} onChange={this.handleContactOptionChange} name="group1" id="radio101"/>
                            Text to 
                            
                          </label>
                        </div>
                    </div>
                    <div className="dragon-select-list-form-cell">
                        <input value={this.state.mobile} onChange={this.updateMobileValue} className="form-control" placeholder="mobile number"/>
                    </div>
                </div>
                
                
                <br/>
                
                <h3>Would you like to learn more about Dragonfly Incentivized Information?</h3>
                  <div className="radio">
                    <label>
                      <input className="form-check-input" type="radio" value="yes" checked={this.state.selectedInterestedOption === 'yes'} onChange={this.handleInterestedOptionChange} name="group2"/>
                      Yes, I am interested in receiving additional information
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input className="form-check-input" type="radio" value="no" checked={this.state.selectedInterestedOption === 'no'} onChange={this.handleInterestedOptionChange} name="group2"/>
                      No, I am not interested
                    </label>
                  </div>
                
                  <br/>
                
                <input type="submit" className={this.state.buttonRestClassName} value="Save" />
                <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving</div>
                
              </form>
              </div>
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><div>powered by</div> <img src="./images/dragonfly-logo.png" /></div>
              </a>
              
        </div>
        <div className="col-sm-2">
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
  
  handleContactOptionChange(e) {
    this.setState({
      selectedContactOption: e.target.value
    });
  }
  
  
  handleInterestedOptionChange(e) {
    this.setState({
      selectedInterestedOption: e.target.value
    });
  }  
  
  updateEmailValue(e) {
    this.setState({
      email: e.target.value, selectedContactOption : "email"
    });
  } 
  
  updateMobileValue(e) {
    this.setState({
      mobile: e.target.value, selectedContactOption : "text"
    });
  } 
  
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    
    
    var preferences = {};
    preferences.emailOrText = this.state.selectedContactOption;
    preferences.interested = this.state.selectedInterestedOption;
    preferences.email = this.state.email;
    preferences.mobile = this.state.mobile;
    
    if ((preferences.email == "") || (preferences.email == null)) preferences.email = "none";
    if ((preferences.mobile == "") || (preferences.mobile == null)) preferences.mobile = "none";
    
    
    var dragonfly = this.props.dragonfly;
    dragonfly.preferences = preferences;
    this.props.handleLoadDragonfly(dragonfly);

    
    myThis.showClickedButtonState(false); 
    myThis.props.history.push('dragonflycomplete');
    
  }
  
  
  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }
  

}

export default DragonflyPreferencesComponent;