import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class AddContactsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {contacts : [0,1,2,3,4,5,6,7,8,9],
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoadContact = this.handleLoadContact.bind(this);

  }

  handleLoadContact(i, first, last, email, isValid) {
    var contact = { first : first, last : last, email : email, isValid : isValid};
    var contacts = this.state.contacts;
    contacts[i] = contact;
    this.setState({
      contacts: contacts
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
    var handleLoadContact = this.handleLoadContact;
    var newContactsJsx = countArray.map((count, i) => {
                return <NewContact i={i} handleLoadContact={handleLoadContact} />
        });


    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();


    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3><i className='fa fa-address-book-o fa-fw'></i> {this.props.contactList.name} </h3>

            <form onSubmit={this.handleSubmit}>
              <div className="dragon-select-list">
                {newContactsJsx}
              </div>

              <br/>

              <input type="submit" className={this.state.buttonRestClassName} value="Add Contacts" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Contacts</div>
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


  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);


    const organizationId = this.props.organizationId;
    const contactListId = this.props.contactList.contactListId;

    var contacts = this.state.contacts;
    var myThis = this;

    var validContacts = [];

    if (this.props.contactList.contacts != null) {
      validContacts = this.props.contactList.contacts;
    }

    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].isValid) {
          validContacts.push({first: contacts[i].first, last: contacts[i].last, email: contacts[i].email});
        }
    }

    var params = {
            TableName:"ContactLists",
            Key: {
                organizationId : organizationId,
                contactListId : contactListId
            },
            UpdateExpression: "set contacts = :contacts",
            ExpressionAttributeValues:{
                ":contacts":validContacts
            },
            ReturnValues:"UPDATED_NEW"
        };



    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      myThis.props.handleLoadContacts(result.Attributes.contacts);
      myThis.props.history.push('contactlist');

    });


  }

}





class NewContact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email : '', firstName : '', lastName : '', isValid : false};
    this.updateFirstNameValue = this.updateFirstNameValue.bind(this);
    this.updateLastNameValue = this.updateLastNameValue.bind(this);
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  render() {

    var validityIndicator = 'fa fa-circle fa-fw dragon-gray';

    if (this.state.isValid) {
      validityIndicator = 'fa fa-check-circle fa-fw dragon-green';
    }



    return (
        <div className="dragon-select-list-row">
            <div className="dragon-select-list-form-cell">
              <i className={validityIndicator}></i>
            </div>
            <div className="dragon-select-list-form-cell">
              <input value={this.state.firstName} onChange={this.updateFirstNameValue} className="form-control" placeholder="first name"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input value={this.state.lastName} onChange={this.updateLastNameValue} className="form-control" placeholder="last name"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input value={this.state.email} onChange={this.updateEmailValue} className="form-control" placeholder="email"/>
            </div>
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
    var emailIsValid = this.validateEmail(email);
    var isValid = firstNameIsValid && lastNameIsValid && emailIsValid;
    this.setState({
      isValid: isValid
    });

    this.props.handleLoadContact(this.props.i, first, last, email, isValid);
  }


  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

}



export default AddContactsComponent;
