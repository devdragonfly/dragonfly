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
    var videosClass = "dragon-left-menu-item";
    var contactlistsClass = "dragon-left-menu-item";
    var settingsClass = "dragon-left-menu-item";

    if (current === "campaigns") { campaignsClass = "dragon-left-menu-item-current"; }
    if (current === "sessions") { sessionsClass = "dragon-left-menu-item-current"; }
    if (current === "videos") { videosClass = "dragon-left-menu-item-current"; }
    if (current === "contactlists") { contactlistsClass = "dragon-left-menu-item-current"; }
    if (current === "settings") { settingsClass = "dragon-left-menu-item-current"; }


    return (


      <div className="dragonfly-menu-container">
        <div className="row header">
          <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
            <li class="nav-item"><a aria-current="page" class="nav-link active active" history="[object Object]" match="[object Object]" href="/"><i class="fe fe-home"></i> Home</a></li>
            <li class="nav-item"><a class="nav-link"><i class="fe fe-box"></i> Interface</a></li>
            <li class="nav-item"><a class="nav-link"><i class="fe fe-calendar"></i> Components</a></li>
            <li class="nav-item"><a class="nav-link"><i class="fe fe-file"></i> Pages</a></li>
            <li class="nav-item"><a class="nav-link" history="[object Object]" match="[object Object]" href="/form-elements"><i class="fe fe-check-square"></i> Forms</a></li>
            <li class="nav-item"><a class="nav-link" history="[object Object]" match="[object Object]" href="/gallery"><i class="fe fe-image"></i> Gallery</a></li>
            <li class="nav-item"><a class="nav-link" href="https://tabler.github.io/tabler-react/documentation"><i class="fe fe-file-text"></i> Documentation</a></li>
          </ul>
        </div>


        <div className="col-sm-2">
          <div className="dragon-left-menu">
            <div className={campaignsClass}><Link to={`campaigns`}>Campaigns</Link></div>
            <div className={sessionsClass}><Link to={`sessions`}>Sessions</Link></div>
            <div className={videosClass}><Link to={`videos`}>Videos</Link></div>
            <div className={contactlistsClass}><Link to={`contactlists`}>Contact Lists</Link></div>
            <div className={settingsClass}><Link to={`settings`}>Settings</Link></div>
          </div>
        </div>
      </div>
    );
  }


}

export default OrganizationMenuComponent;
