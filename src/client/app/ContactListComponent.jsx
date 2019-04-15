import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import readXlsxFile from 'read-excel-file'



class ContactListComponent extends React.Component {

  constructor(props) {
    super(props);


    this.handleFile = this.handleFile.bind(this);

  }

  render() {

    var contacts = this.props.contactList.contacts;

    var contactsJsx = function() {return '' }();

    if (contacts == null){
      contactsJsx = function() {return 'No contacts added to this list yet.' }();
    } else {
      contactsJsx = contacts.map((contact, i) => {
          return <Contact contact={contact} />
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
            {/*<Link to={`importcontacts`}><i className='fa fa-file-excel-o'></i> Import Contacts 333</Link>*/}

            <input type="file" onChange={this.handleFile} className="form-control" id="input" placeholder="exel file"/>
          </div>
          <div className="col-sm-4">
          </div>
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

      });
    });
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
  }

  render() {
    return (
        <div className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-address-card fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.first}
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.last}
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.email}
          </div>
        </div>
    );
  }

}







export default ContactListComponent;
