import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import ImportAlertComponent from './ImportAlertComponent.jsx';
import ReactDOM from 'react-dom';
import readXlsxFile from 'read-excel-file'
import EditContact from './EditContactComponet.jsx'



class ContactListComponent extends React.Component {

  constructor(props) {
    super(props);


    this.handleFile = this.handleFile.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);

    this.state = {
      show: false,
      alertMessage: ''
    };
  }

  deleteContact(id) {
    var myThis = this;
    const organizationId = this.props.organizationId;
    const contactListId = this.props.contactList.contactListId;
    if ( confirm("Are you sure?") ) {
      this.props.contactList.contacts.splice(id, 1);
      var contacts = this.props.contactList.contacts;
      var params = {
              TableName:"ContactLists",
              Key: {
                  organizationId : organizationId,
                  contactListId : contactListId
              },
              UpdateExpression: "set contacts = :contacts",
              ExpressionAttributeValues:{
                  ":contacts":contacts
              },
              ReturnValues:"UPDATED_NEW"
          };

      this.props.dbUpdate(params, function(result) {
        myThis.props.handleLoadContacts(result.Attributes.contacts);
        myThis.props.history.push('contactlist');
      });
    }

  }

  editContact(id, contact, callback) {
    var myThis = this;
    const organizationId = this.props.organizationId;
    const contactListId = this.props.contactList.contactListId;
    this.props.contactList.contacts[id] = contact;
    var contacts = this.props.contactList.contacts;
    var params = {
            TableName:"ContactLists",
            Key: {
                organizationId : organizationId,
                contactListId : contactListId
            },
            UpdateExpression: "set contacts = :contacts",
            ExpressionAttributeValues:{
                ":contacts":contacts
            },
            ReturnValues:"UPDATED_NEW"
        };

    this.props.dbUpdate(params, function(result) {
      myThis.props.handleLoadContacts(result.Attributes.contacts);
      callback();
    });
  }

  render() {

    var contacts = this.props.contactList.contacts;
    var contactsJsx = function() {return '' }();

    if (contacts == null){
      contactsJsx = function() {return 'No contacts added to this list yet.' }();
    } else {
      contactsJsx = contacts.map((contact, i) => {
          return <Contact contact={contact} contactIndex={i} deleteContact={this.deleteContact} editContact={this.editContact} />
      });

    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();

    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-6">
            <h3><i className='fa fa-address-book-o fa-fw'></i> {this.props.contactList.name}</h3>

            <div className="dragon-select-list">
              {contactsJsx}
            </div>

            <br/>

            <Link to={`addcontacts`} className="btn btn-primary"><i className='fa fa-plus'></i> Add Contacts</Link>

            <br/>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <br/>
            <div className="row">
              <div className="col-sm-6">
                {/*onClick={this.showAlert} */}
                <label for="input">Import your contact list in xlsx format</label>
                <input type="file" accept=".xlsx" onChange={this.handleFile} className="form-control" id="input" placeholder="exel file"/>
              </div>
            </div>

          </div>
          <div className="col-sm-4">
          </div>
          <ImportAlertComponent show={this.state.show} onClose={this.showAlert} alertMessage={this.state.alertMessage}/>

        </div>

    );
  }


  handleFile(e) {
    const organizationId = this.props.organizationId;
    const contactListId = this.props.contactList.contactListId;

    var file = e.target.files[0];
    var myThis = this;
    var validContacts = [];
    var contacts = [];
    var titles = [];
    var titlesIndex = {};

    readXlsxFile(file).then((rows) => {
      titles = rows[0];

      for (var i = 0; i < titles.length; i++) {
        if ( titles[i] == 'First name' ) {
          titlesIndex.first = i;
        }
        if ( titles[i] == 'Last name' ) {
          titlesIndex.last = i;
        }
        if ( titles[i] == 'Email' ) {
          titlesIndex.email = i;
        }
      }

      if (this.headerOfFileIsNotValid(titlesIndex)) {
        this.showAlert(
          "There are no headers in your file or they are not in the correct format. \n" +
          "There should be the following headings: First name, Last name, Email"
        );
      } else {
        if (this.props.contactList.contacts != null) {
          validContacts = this.props.contactList.contacts;
        }

        for (var i = 1; i < rows.length; i++) {
            contacts.push({
              first: rows[i][titlesIndex.first],
              last:  rows[i][titlesIndex.last],
              email: rows[i][titlesIndex.email],
              isValid: this.validate(rows[i][titlesIndex.first], rows[i][titlesIndex.last], rows[i][titlesIndex.email])
            });

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
          myThis.props.handleLoadContacts(result.Attributes.contacts);
          myThis.props.history.push('contactlist');
          myThis.showAlert("Your file has been successfully imported.");
        });
      }

    });
  }

  showAlert(message) {
    this.setState({
      show: !this.state.show,
      alertMessage: message
    });
  };

  headerOfFileIsNotValid(titlesIndex) {
    var arrayOfTitle = Object.keys(titlesIndex);
    return arrayOfTitle && arrayOfTitle.length != 3;
  }

  validate(first, last, email) {

    var firstNameIsValid = first.length > 0;
    var lastNameIsValid = last.length > 0;
    var emailIsValid = this.validateEmail(email);

    return firstNameIsValid && lastNameIsValid && emailIsValid;

  }


  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }


}




class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoadContact = this.handleLoadContact.bind(this);
    this.handleCloseContactEdit = this.handleCloseContactEdit.bind(this);
    this.state = {
      edit: false,
      contact: this.props.contact
    }
  }

  handleEditContact() {
    this.setState({edit: true});
  }

  handleCloseContactEdit() {
    this.setState({edit: false});
  }

  handleDeleteContact() {
    this.props.deleteContact(this.props.contactIndex);
  }

  handleLoadContact(first, last, email, isValid) {
    var myThis = this;
    if (isValid) {
      var contact = { first : first, last : last, email : email};
      this.props.editContact(this.props.contactIndex, contact, function(){
        myThis.setState({edit: false});
      });
    } else {
      alert('Your contact is not valid!');
    }

  }

  render() {
    const edit = this.state.edit;
    const index = this.props.contactIndex;
    var contactForm;

    if (edit) {
      contactForm = (
        <EditContact i={index} contact={this.props.contact} handleCloseContactEdit={this.handleCloseContactEdit} handleLoadContact={this.handleLoadContact}/>
      );
    } else {
      contactForm = (<div className="dragon-select-list">
                <div className="dragon-select-list-cell">
                  {this.props.contact.first}
                </div>
                <div className="dragon-select-list-cell">
                  {this.props.contact.last}
                </div>
                <div className="dragon-select-list-cell">
                  {this.props.contact.email}
                </div>
                <div className="dragon-select-list-cell" onClick={this.handleEditContact.bind(this)}>
                  <i className="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
                </div>
                <div className="dragon-select-list-cell" onClick={this.handleDeleteContact.bind(this)}>
                  <i className='fa fa-trash fa-fw fa-lg'></i>
                </div>
              </div>
            );
    }


    return (
        <div className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-address-card fa-fw fa-lg'></i>
          </div>
          {contactForm}
        </div>
    );
  }

}







export default ContactListComponent;
