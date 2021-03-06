import React from 'react';
import { Link } from 'react-router';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class ContactListsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    console.log("Loading ContactLists Page");
    var contactLists = this.props.contactLists;
    if (contactLists === 'not found') {
      this.props.handleLoadNext('contactlists');
      this.props.history.push('loadcontactlists');
    }

    console.log(this.props.history);
  }


  render() {
    var contactLists = this.props.contactLists;
    var handleLoadContactList = this.props.handleLoadContactList;
    var history = this.props.history;
    var dbDelete = this.props.dbDelete;
    var dbUpdate = this.props.dbUpdate;
    var contactListsJsx = function () { return '' }();

    var numContactLists = 0;

    if (contactLists !== 'not found') {
      if (contactLists.length === 0) {
        contactListsJsx = function () { return 'No contact lists created yet.' }();

      } else {
        numContactLists = contactLists.length;
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


    var appMenu = function () { return <AppMenuComponent current="contactlists" /> }();


    return (

      <div className="contacts-container">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">Contact Lists</h3>
                  <p>You have <b>{numContactLists}</b> contact lists.</p>
                </div>

                <div className="page_header_action float-right">
                  <Link to={`createcontactlist`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Contact List</Link>
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>


            <div className="row">
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

    let numContacts = 0;
    if (this.props.contactList.contacts) {
      numContacts = this.props.contactList.contacts.length;
    }


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
      contactName = this.props.contactList.name;
      
      // (
      //   {this.props.contactList.name}

      //   // <div className="dragon-select-list-cell" onClick={this.handleSelectContactList.bind(this, this.props.contactList)}>
      //   //   {adressBookIcon}
      //   //   <div className="dragon-list-cell">
      //   //     {this.props.contactList.name}
      //   //   </div>
      //   // </div>
      // );
    }

    return (

      <div className="col-12 col-md-4 col-lg-3 campaign-cards-container" onClick={this.handleSelectContactList.bind(this, this.props.contactList)}>

        <div id="video_component" className="">
          <div className="dragonfly-card">
            <div className="card">
              <div className="card-body">

                <h5 className="card-title">{contactName}</h5>
                <h6 className="card-subtitle mb-2"><i className="fas fa-user"></i> {numContacts} Contacts </h6>

                <div className="card-action-links">
                  <a onClick={this.handleEditContactList.bind(this)} className="card-link link-video-view"><i className="fas fa-user-friends"></i> View</a>
                  {/* <a onClick={this.handleDeleteContactList.bind(this)} className="card-link link-video-edit"><i className="fas fa-plus"></i> Quick Add</a> */}
                  <a className="card-link link-video-edit"><i className="fas fa-plus"></i> Quick Add</a>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      // <div className="dragon-select-list-row dragon-pointer">
      //   {contactName}
      //   <div className="dragon-select-list-cell" onClick={this.handleEditContactList.bind(this)}>
      //     <i className="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
      //   </div>
      //   <div className="dragon-select-list-cell" onClick={this.handleDeleteContactList.bind(this)}>
      //     <i className='fa fa-trash fa-fw fa-lg'></i>
      //   </div>
      // </div>
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
