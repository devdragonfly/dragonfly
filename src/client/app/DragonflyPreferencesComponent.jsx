//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';
import LogoComponent from './components/LogoComponent.jsx';


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
                  selectedNPS : "5",
                  openTextValue : "",
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    
    this.titleCase = this.titleCase.bind(this);
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updateMobileValue = this.updateMobileValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleContactOptionChange = this.handleContactOptionChange.bind(this);
    this.handleNPSOptionChange = this.handleNPSOptionChange.bind(this);
    this.handleOpenTextChange = this.handleOpenTextChange.bind(this);
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
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <br/><br/>
          <div className="jumbotron dragon-enlarge">
            <div className="clearfix">
              <a href={this.state.path} target="_blank">
                <div className="dragon-powered-by divLeft">
                  <LogoComponent dragonfly={dragonfly} />
                </div>
              </a>
            </div>
            <form onSubmit={this.handleSubmit}>
              <h2>Congratulations {first}!</h2>
              <br/>
              <h4>Your session is complete and you have earned ${earned}.</h4>
              <br/>
              <h4>We are going to pay you through the Venmo App, please indicate your preferred contact method:</h4>
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
              <h4>How likely are you to recommend Dragonfly to a friend or colleague?</h4>
              <span className="NPStext">
                Not At All Likely
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Neutral
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Extremely Likely
              </span>
              <table>
                <tr>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="0" checked={this.state.selectedNPS === '0'} onChange={this.handleNPSOptionChange} name="group2"/><br/>0</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="1" checked={this.state.selectedNPS === '1'} onChange={this.handleNPSOptionChange} name="group2"/><br/>1</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="2" checked={this.state.selectedNPS === '2'} onChange={this.handleNPSOptionChange} name="group2"/><br/>2</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="3" checked={this.state.selectedNPS === '3'} onChange={this.handleNPSOptionChange} name="group2"/><br/>3</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="4" checked={this.state.selectedNPS === '4'} onChange={this.handleNPSOptionChange} name="group2"/><br/>4</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="5" checked={this.state.selectedNPS === '5'} onChange={this.handleNPSOptionChange} name="group2"/><br/>5</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="6" checked={this.state.selectedNPS === '6'} onChange={this.handleNPSOptionChange} name="group2"/><br/>6</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="7" checked={this.state.selectedNPS === '7'} onChange={this.handleNPSOptionChange} name="group2"/><br/>7</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="8" checked={this.state.selectedNPS === '8'} onChange={this.handleNPSOptionChange} name="group2"/><br/>8</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="9" checked={this.state.selectedNPS === '9'} onChange={this.handleNPSOptionChange} name="group2"/><br/>9</td>
                  <td className="dragon-nps-col"><input className="form-check-input" type="radio" value="10" checked={this.state.selectedNPS === '10'} onChange={this.handleNPSOptionChange} name="group2"/><br/>10</td>
                </tr>
              </table>
              <br/>
              <h4>Do you have any ideas, comments, concerns, or objections that will help us improve our message or product?</h4>
              <textarea rows="4" cols="50" value={this.state.openTextValue} onChange={this.handleOpenTextChange}></textarea>
              <br/>
              <br/>
              <input type="submit" className={this.state.buttonRestClassName} value="Save" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving</div>
            </form>
          </div>
        </div>
        <div className="col-sm-2"> </div>
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
  
  
  handleNPSOptionChange(e) {
    this.setState({
      selectedNPS: e.target.value
    });
  }  
  
  
  handleOpenTextChange(e) {
    this.setState({
      openTextValue: e.target.value
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
    preferences.nps = this.state.selectedNPS;
    preferences.email = this.state.email;
    preferences.mobile = this.state.mobile;
    preferences.text = this.state.openTextValue;
    
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