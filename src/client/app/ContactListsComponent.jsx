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
      this.props.history.push('loadcontactlists');
    }
  }

  render() {
    var contactLists = this.props.contactLists;
    var handleLoadContactList = this.props.handleLoadContactList;
    var history = this.props.history;
    
    var contactListsJsx = function() {return '' }();
    
    if (contactLists !== 'not found') {
          if (contactLists.length === 0) {
            contactListsJsx = function() {return 'No contact lists created yet.' }();
            
          } else {
            contactListsJsx = this.props.contactLists.map((contactList, i) => {
                return <ContactList contactList={contactList} handleLoadContactList={handleLoadContactList} history={history}/>
            });
          }
    }
    
    if (contactLists.length === 0) {
      
      
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>
              Contact Lists
            </h3>
            
            <div className="dragon-select-list">
              {contactListsJsx}
            </div>
            
            
            <Link to={`createcontactlist`} className="btn btn-primary"><i className='fa fa-plus'></i> Create Contact List</Link>
            
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
        <div onClick={this.handleSelectContactList.bind(this, this.props.contactList)}>
          <i className='fa fa-address-book-o fa-fw'></i> {this.props.contactList.name}
        </div>
    );
  }
  
  handleSelectContactList(contactList) {
    this.props.handleLoadContactList(contactList);
    this.props.history.push('contactlist');
  }

}




export default ContactListsComponent;