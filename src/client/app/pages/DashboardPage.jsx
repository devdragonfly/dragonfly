import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from '../OrganizationMenuComponent.jsx';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);

  }
  

  render() {

    var organizationMenu = function() {return <OrganizationMenuComponent current="dashboard" /> }();

    
    return (

        <div className="row">
            {organizationMenu}
            <h1>Hello</h1>
        </div>

    );
  }
  


}



export default DashboardPage;