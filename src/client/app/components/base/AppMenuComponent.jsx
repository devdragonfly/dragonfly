import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class AppMenuComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    var current = this.props.current;

    var campaignsClass = "nav-item";
    var sessionsClass = "nav-item";
    var videosClass = "nav-item";
    var contactlistsClass = "nav-item";
    var settingsClass = "nav-item";

    if (current === "campaigns") { campaignsClass = "nav-item active"; }
    if (current === "sessions") { sessionsClass = "nav-item active"; }
    if (current === "videos") { videosClass = "nav-item active"; }
    if (current === "contactlists") { contactlistsClass = "nav-item active"; }
    if (current === "settings") { settingsClass = "nav-item active"; }


    return (


      <div className="dragonfly-menu-container">
        <div className="row app-menu">
          <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
            <li className={campaignsClass}><Link className="nav-link" to={`campaigns`}><i className="fe fe-box"></i> Campaigns</Link></li>
            <li className={sessionsClass}><Link className="nav-link" to={`sessions`}><i className="fe fe-calendar"></i> Sessions</Link></li>
            <li className={videosClass}><Link className="nav-link" to={`videos`}><i className="fe fe-file"></i> Videos</Link></li>
            <li className={contactlistsClass}><Link className="nav-link" to={`contactlists`}><i className="fe fe-check-square"></i> Contact Lists</Link></li>
            <li className={settingsClass}><Link className="nav-link" to={`settings`}><i className="fe fe-image"></i> Settings</Link></li>
          </ul>
        </div>
      </div>
    );
  }


}

export default AppMenuComponent;
