import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

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
    var contactListsJsx = function() {return '' }();

    if (contactLists !== 'not found') {
          if (contactLists.length === 0) {
            contactListsJsx = function() {return 'No contact lists created yet.' }();

          } else {
            var contactCount = 0;
            contactListsJsx = this.props.contactLists.map((contactList, i) => {
                contactCount = 0;
                if (contactList.contacts != null) {
                  contactCount = contactList.contacts.length;
                }
                return <ContactList contactList={contactList} handleLoadContactList={handleLoadContactList} contactCount={contactCount} history={history} dbDelete={dbDelete} />
            });
            console.log('contactListsJsx', contactListsJsx);
          }
    }


    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();

    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3>
              Contact Lists
            </h3>


            <div className="dragon-select-list">
              {contactListsJsx}
            </div>

            <br/>

            <Link to={`createcontactlist`} className="btn btn-primary"><i className='fa fa-plus'></i> Create Contact List</Link>

          </div>
          <div className="col-sm-4">
          </div>
        </div>



    );
  }


}





class ContactList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell" onClick={this.handleSelectContactList.bind(this, this.props.contactList)}>
            <i className='fa fa-address-book-o fa-fw fa-lg'></i>
            {this.props.contactList.name}
            Contacts ({this.props.contactCount})
          </div>
          <div className="dragon-select-list-cell" onClick={this.handleEditContactList.bind(this)}>
            <i className="fa fa-pencil-square-o fa-fw fa-lg" aria-hidden="true"></i>
          </div>
          <div className="dragon-select-list-cell" onClick={this.handleDeleteContactList.bind(this)}>
            <i className='fa fa-times fa-fw fa-lg'></i>
          </div>
        </div>
    );
  }

  handleSelectContactList(contactList) {
    this.props.handleLoadContactList(contactList);
    this.props.history.push('contactlist');
  }

  handleEditContactList() {
    console.log('Edit');
    console.log('this.props', this.props);

  }

  handleDeleteContactList() {
    if ( confirm("Are you sure!") ) {
      var organizationId = this.props.contactList.organizationId;
      var contactListId = this.props.contactList.contactListId;
      console.log('organizationId', organizationId, 'contactListId', contactListId);
      var params = {
          TableName:"ContactLists",
          Key:{
              organizationId : organizationId,
              contactListId : contactListId
          }
        };

      this.props.dbDelete(params, function(result){
        console.log('delete finished', result);
      });
    }


  }

}




export default ContactListsComponent;
