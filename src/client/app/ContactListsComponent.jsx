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
      contactListsJsx = this.props.contactLists.map((contactList, i) => {
          return <ContactList contactList={contactList} handleLoadContactList={handleLoadContactList} history={history}/>
      });
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>
              Contact Lists
            </h3>
            
            <br/><br/>
            
            {contactListsJsx}
            
            <br/><br/>
            
            <Link to={`loadcontactlists`}><i className='fa fa-refresh fa-fw'></i> Refresh</Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link to={`createcontactlist`}><i className='fa fa-plus fa-fw'></i> Create Contact List</Link>
            
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
        <div>
          {this.props.contactList.name}
        </div>
    );
  }
  
  handleSelectContactList(contactList) {
    this.props.handleLoadContactList(contactList);
    this.props.history.push('contactlist');
  }

}




export default ContactListsComponent;