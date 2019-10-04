import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class ContactListsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    var contactLists = this.props.contactLists;
    if (contactLists === 'not found') {
      this.props.handleLoadNext('contactlists');
      this.props.history.push('loadcontactlists');
    }
  }

  render() {
    var contactLists = this.props.contactLists;
    var handleLoadContactList = this.props.handleLoadContactList;
    var history = this.props.history;
    var dbDelete = this.props.dbDelete;
    var dbUpdate = this.props.dbUpdate;
    var contactListsJsx = function () { return '' }();

    if (contactLists !== 'not found') {
      if (contactLists.length === 0) {
        contactListsJsx = function () { return 'No contact lists created yet.' }();

      } else {
        var contactCount = 0;
        contactListsJsx = this.props.contactLists.map((contactList, i) => {
          contactCount = 0;
          if (contactList.contacts != null) {
            contactCount = contactList.contacts.length;
          }
          return <ContactList contactList={contactList} handleLoadContactList={handleLoadContactList} contactCount={contactCount} history={history} dbDelete={dbDelete} dbUpdate={dbUpdate} />
        });
      }
    }


    var organizationMenu = function () { return <OrganizationMenuComponent current="contactlists" /> }();
    var appMenu = function () { return <AppMenuComponent current="contactlists" /> }();


    return (

      <div className="contacts-container">
        {appMenu}


        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row page_header_container">
              <div className="col-12">
                <h3 className="page_header_title float-left">Contacts</h3>
                <div className="page_header_action float-right">
                  <Link to={`createcontactlist`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Contact List</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>


            <div className="dragon-select-list">
              {contactListsJsx}
            </div>

            <br />

          </div>

        </div>


      </div>




    );
  }


}





class ContactList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  render() {
    const edit = this.state.edit;
    const adressBookIcon = (
      <div className="dragon-list-cell">
        <i className='fa fa-address-book-o fa-fw fa-lg'></i>
      </div>
    );
    let contactName;


    if (edit) {
      contactName = (
        <div className="dragon-select-list-cell">
          {adressBookIcon}
          <div className="dragon-list-cell">
            <input className="form-control" autoFocus defaultValue={this.props.contactList.name} onKeyDown={this.handleKeyDown.bind(this)} />
            <div className="dragon-message">
              Press Enter to save, ESC to exit
            </div>
          </div>
        </div>
      );
    } else {
      contactName = (
        <div className="dragon-select-list-cell" onClick={this.handleSelectContactList.bind(this, this.props.contactList)}>
          {adressBookIcon}
          <div className="dragon-list-cell">
            {this.props.contactList.name}
          </div>
        </div>
      );
    }

    return (
      <div className="dragon-select-list-row dragon-pointer">
        {contactName}
        <div className="dragon-select-list-cell" onClick={this.handleEditContactList.bind(this)}>
          <i className="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
        </div>
        <div className="dragon-select-list-cell" onClick={this.handleDeleteContactList.bind(this)}>
          <i className='fa fa-trash fa-fw fa-lg'></i>
        </div>
      </div>
    );

  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      var newContactListName = e.target.value;
      if (newContactListName.length > 0 && newContactListName !== e.target.defaultValue) {
        var myThis = this;
        const organizationId = this.props.contactList.organizationId;
        const contactListId = this.props.contactList.contactListId;
        var params = {
          TableName: "ContactLists",
          Key: {
            organizationId: organizationId,
            contactListId: contactListId
          },
          UpdateExpression: "set #name = :name",
          ExpressionAttributeValues: {
            ":name": newContactListName
          },
          ExpressionAttributeNames: {
            "#name": "name"
          },
          ReturnValues: "UPDATED_NEW"
        };

        this.props.dbUpdate(params, function (result) {
          myThis.props.history.push('loadcontactlists');
        });
      } else if (newContactListName === e.target.defaultValue) {
        this.setState({ edit: false });
      } else {
        alert('Please enter a name for your Contact List.')
      }

    } else if (e.key === "Escape") {
      this.setState({ edit: false });
    }
  }

  handleSelectContactList(contactList) {
    this.props.handleLoadContactList(contactList);
    this.props.history.push('contactlist');
  }

  handleEditContactList() {
    this.setState({ edit: true });
  }

  handleDeleteContactList() {
    if (confirm("Are you sure?")) {
      var myThis = this;
      const organizationId = this.props.contactList.organizationId;
      const contactListId = this.props.contactList.contactListId;
      var params = {
        TableName: "ContactLists",
        Key: {
          organizationId: organizationId,
          contactListId: contactListId
        }
      };

      this.props.dbDelete(params, function (result) {
        myThis.props.history.push('loadcontactlists');
      });
    }

  }

}




export default ContactListsComponent;
