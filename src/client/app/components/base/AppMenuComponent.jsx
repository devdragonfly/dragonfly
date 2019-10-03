import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class AppMenuComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    var current = this.props.current;

    var homeClass = "nav-link";
    var campaignsClass = "nav-link";
    var sessionsClass = "nav-link";
    var videosClass = "nav-link";
    var contactlistsClass = "nav-link";
    var settingsClass = "nav-link";

    if (current === "campaigns") { campaignsClass = "nav-link active"; }
    if (current === "sessions") { sessionsClass = "nav-link active"; }
    if (current === "videos") { videosClass = "nav-link active"; }
    if (current === "contactlists") { contactlistsClass = "nav-link active"; }
    if (current === "settings") { settingsClass = "nav-link active"; }


    return (


      <div className="dragonfly-menu-container">
        <div className="row app-menu justify-content-center">
          <div className="col-12 col-lg-10 app-nav-container">
            <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
              <li className="nav-item"><Link className={homeClass} to={`campaigns`}><i className="fas fa-home"></i> Home</Link></li>
              <li className="nav-item"><Link className={campaignsClass} to={`campaigns`}><i className="fas fa-box"></i> Campaigns</Link></li>
              <li className="nav-item"><Link className={sessionsClass} to={`sessions`}><i className="far fa-clipboard"></i> Sessions</Link></li>
              <li className="nav-item"><Link className={videosClass} to={`videos`}><i className="fas fa-video"></i> Videos</Link></li>
              <li className="nav-item"><Link className={contactlistsClass} to={`contactlists`}><i className="fas fa-user-friends"></i> Contacts</Link></li>
              <li className="nav-item"><Link className={settingsClass} to={`settings`}><i className="fas fa-wrench"></i> Settings</Link></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }


}

export default AppMenuComponent;
