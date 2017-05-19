import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class ContactListsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="contactlists" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>Contact Lists</h3>
          </div>
        </div>



    );
  }


}

export default ContactListsComponent;