import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';




class ContactListComponent extends React.Component {

  constructor(props) {
    super(props);

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

          <div className="col-sm-10">
            <h3><i className='fa fa-address-book-o fa-fw'></i> {this.props.contactList.name}</h3>
            
            <div className="dragon-select-list">
              {contactsJsx}
            </div>
            
            
            <Link to={`addcontacts`} className="btn btn-primary"><i className='fa fa-plus'></i> Add Contacts</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`importcontacts`}><i className='fa fa-file-excel-o'></i> Import Contacts</Link>
          </div>
          
        </div>



    );
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
            <i className='fa fa-address-card fa-fw'></i>
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