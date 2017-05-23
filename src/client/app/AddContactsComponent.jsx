import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class AddContactsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {validContacts : [0,1,2,3,4,5,6,7,8,9],
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadValidContact = this.handleLoadValidContact.bind(this);

  }
  
  handleLoadValidContact(i, first, last, email, isValid) {
    var contact = { first : first, last : last, email : email, isValid : isValid};
    var validContacts = this.state.validContacts;
    validContacts[i] = contact;
    this.setState({
      validContacts: validContacts
    });    
    
  }
  
  componentWillMount() {
    var contactLists = this.props.contactLists;
    if (contactLists === 'not found') {
      this.props.history.push('loadcontactlists');
    }
  }

  render() {

    var countArray = [0,1,2,3,4,5,6,7,8,9];
    var handleLoadValidContact = this.handleLoadValidContact;
    var newContactsJsx = countArray.map((count, i) => {
                return <NewContact i={i} handleLoadValidContact={handleLoadValidContact} />
        });


    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>
              <h3><i className='fa fa-address-book-o fa-fw'></i> {this.props.contactList.name}</h3>
            </h3>
            
            <form onSubmit={this.handleSubmit}>
              <div>
                {newContactsJsx}
              </div>
            
              <input type="submit" className={this.state.buttonRestClassName} value="Save" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving</div>
            </form>
            
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


  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var validContacts = this.state.validContacts;
    var myThis = this;
    
    
    alert(JSON.stringify(validContacts));
    this.showClickedButtonState(false);
    
  }

}





class NewContact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email : '', firstName : '', lastName : '', isValid : false};
    this.updateFirstNameValue = this.updateFirstNameValue.bind(this);
    this.updateLastNameValue = this.updateLastNameValue.bind(this);
    this.updateEmailValue = this.updateEmailValue.bind(this);
  }

  render() {

    var validityIndicator = 'fa fa-circle fa-fw dragon-gray';
    
    if (this.state.isValid) {
      validityIndicator = 'fa fa-check-circle fa-fw dragon-green';
    }
    
    
    
    return (
        <div className="form-inline">
          <i className={validityIndicator}></i> 
          <input value={this.state.firstName} onChange={this.updateFirstNameValue} className="form-control" placeholder="first name"/>
          <input value={this.state.lastName} onChange={this.updateLastNameValue} className="form-control" placeholder="last name"/>
          <input value={this.state.email} onChange={this.updateEmailValue} className="form-control" placeholder="email"/>
        </div>
    );
  }
  
  updateFirstNameValue(e) {
    this.setState({
      firstName: e.target.value
    });
    this.validate(e.target.value, this.state.lastName, this.state.email);
  } 

  updateLastNameValue(e) {
    this.setState({
      lastName: e.target.value
    });
    this.validate(this.state.firstName, e.target.value, this.state.email);
  } 

  updateEmailValue(e) {
    this.setState({
      email: e.target.value
    });
    this.validate(this.state.firstName, this.state.lastName, e.target.value);
  }
  
  validate(first, last, email) {

    var firstNameIsValid = first.length > 0;
    var lastNameIsValid = last.length > 0;
    var emailIsValid = email.length > 0;
    var isValid = firstNameIsValid && lastNameIsValid && emailIsValid;
    this.setState({
      isValid: isValid
    });
    
    this.props.handleLoadValidContact(this.props.i, first, last, email, isValid);
    
    
    
  }
  
  
  


}




export default AddContactsComponent;