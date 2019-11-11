import React from 'react';
import { Link } from 'react-router';
// import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class CampaignSelectContactListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelectContactList = this.handleSelectContactList.bind(this);
  }

  componentWillMount() {
    var contactLists = this.props.contactLists;
    if (contactLists == 'not found') {
      this.props.handleLoadNext('campaignselectcontactlist');
      this.props.history.push('loadcontactlists');
    }
    if (contactLists.length === 0) {
      this.props.history.push('campaignnocontactlists');
    }

  }

  render() {

    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();

    var contactLists = this.props.contactLists;
    var handleSelectContactList = this.handleSelectContactList;
    var history = this.props.history;




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
          } else { return null; }
          return <ContactList contactList={contactList} handleSelectContactList={handleSelectContactList} contactCount={contactCount} />
        });
      }
    }

    return (

      <div id="viewCampaignComponent">
        {appMenu}

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br /><br />
            Select a Contact List for this Campaign:
            <br /><br />

            <div className="dragon-select-list">
              {contactListsJsx}
            </div>

            <br /><br />
            If you have not created the Contact List for this Campaign yet, &nbsp;
            <Link to={`createcontactlist`}>click here</Link>
            &nbsp; to create it now.
          <br /><br />

          </div>

        </div>
      </div>

    );
  }





  handleSelectContactList(contactList) {
    var campaign = this.props.campaign;
    campaign.contactList = contactList;
    this.props.handleLoadCampaign(campaign);
    this.props.history.push('campaign');
  }

}





class ContactList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.selectContactList.bind(this, this.props.contactList)} className="dragon-select-list-row dragon-pointer">
        <div className="dragon-select-list-cell">
          <i className='fa fa-address-book-o fa-fw fa-lg'></i>
        </div>
        <div className="dragon-select-list-cell">
          {this.props.contactList.name}
        </div>
        <div className="dragon-select-list-cell">
          Contacts ({this.props.contactCount})
          </div>
      </div>
    );
  }

  selectContactList(contactList) {
    this.props.handleSelectContactList(contactList);
  }

}



export default CampaignSelectContactListComponent;
