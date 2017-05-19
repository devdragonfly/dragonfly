import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class OrganizationMenuComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var current = this.props.current;
    
    var campaignsClass = "dragon-left-menu-item";
    var sessionsClass = "dragon-left-menu-item";
    var contactlistsClass = "dragon-left-menu-item";
    var settingsClass = "dragon-left-menu-item";
    
    if (current === "campaigns") { campaignsClass = "dragon-left-menu-item-current"; }
    if (current === "sessions") { sessionsClass = "dragon-left-menu-item-current"; }
    if (current === "contactlists") { contactlistsClass = "dragon-left-menu-item-current"; }
    if (current === "settings") { settingsClass = "dragon-left-menu-item-current"; }
    
    
    return (

          <div className="col-sm-2">
            <div className="dragon-left-menu">
              <div className={campaignsClass}><Link to={`campaigns`}>Campaigns</Link></div>
              <div className={sessionsClass}><Link to={`sessions`}>Sessions</Link></div>
              <div className={contactlistsClass}><Link to={`contactlists`}>Contact Lists</Link></div>
              <div className={settingsClass}><Link to={`settings`}>Settings</Link></div>
            </div>
          </div> 

    );
  }


}

export default OrganizationMenuComponent;