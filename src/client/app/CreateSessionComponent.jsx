import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



const buttonClassName = "btn btn-primary";

class CreateSessionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {nameValue : '',
                  validationMessage : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateNameValue = this.updateNameValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  render() {

    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();


    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-4">
            <form onSubmit={this.handleSubmit}>
                <h3>Create Session</h3>

                <br/><br/>

                <input value={this.state.nameValue} onChange={this.updateNameValue} className="form-control input-lg" placeholder="name of session"/>
                <div className="dragon-validation-message">{this.state.validationMessage}</div>
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

  updateNameValue(e) {
    this.setState({
      nameValue: e.target.value
    });
  }




  validate(name) {
    name = name.trim();
    if (name.length === 0) {
      this.setState({ validationMessage: "Please enter a name for your Session." });
      return false;
    }

    return true;
  }



  handleSubmit(e) {
    e.preventDefault();
    const nameValue = this.state.nameValue.trim();

    var isValid = this.validate(nameValue);
    if (!isValid) return;


    this.showClickedButtonState(true);
    var myThis = this;

    const organizationIdValue = this.props.organizationId;

    var sessionIdValue = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });



    var params = {
        TableName:"Sessions",
        Item:{
            organizationId : organizationIdValue,
            sessionId : sessionIdValue,
            name : nameValue
        }
    };

    this.props.dbPut(params, function(result){
      myThis.props.handleLoadNext('sessions');
      myThis.showClickedButtonState(false);
      mixpanel.track("Generate Dragonfly Sessions", {
        'Name': nameValue,
        'SessionId': sessionIdValue,
        'OrganizationId': organizationIdValue
      });
      myThis.props.history.push('loadsessions');
    });

  }



}

export default CreateSessionComponent;
