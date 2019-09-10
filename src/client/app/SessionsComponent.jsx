import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

class SessionsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    var sessions = this.props.sessions;
    if (sessions === 'not found') {
      this.props.handleLoadNext('sessions');
      this.props.history.push('loadsessions');
    }
  }

  render() {
    var sessions = this.props.sessions;
    var handleLoadSession = this.props.handleLoadSession;
    var history = this.props.history;

    var sessionsJsx = function () { return '' }();

    if (sessions !== 'not found') {
      if (sessions.length === 0) {
        sessionsJsx = function () { return 'No sessions created yet.' }();

      } else {
        var breakpointCount = 0;
        sessionsJsx = this.props.sessions.map((session, i) => {
          breakpointCount = 0;
          if (session.breakpoints != null) {
            breakpointCount = session.breakpoints.length;
          }
          return <Session session={session} handleLoadSession={handleLoadSession} breakpointCount={breakpointCount} history={history} />
        });
      }
    }

    var organizationMenu = function () { return <OrganizationMenuComponent current="sessions" /> }();


    return (

      <div className="row">
        {organizationMenu}
        <div className="col-10">

          <div className="row page_header_container">
            <div className="col-12">
              <h3 className="page_header_title float-left">Sessions</h3>
              <div className="page_header_action float-right">
                <Link to={`createsession`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Session</Link>
              </div>
              <div className="clearfix"></div>
              <hr className="page_header_divider" />
            </div>
          </div>


          <div className="dragon-select-list">
            {sessionsJsx}
          </div>

          <br />

        </div>

      </div>



    );
  }


}





class Session extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>


        <div id="sessions_component">
          <div className="col-sm-4 campaign_card" onClick={this.handleSelectSession.bind(this, this.props.session)}>
            <div className="card">
              <img src="../assets/images/placeholders/placeholder_blue.png" class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{this.props.session.name}</h5>
                <p className="card-text">Breakpoints ({this.props.breakpointCount})</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div onClick={this.handleSelectSession.bind(this, this.props.session)} className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-graduation-cap fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell">
            {this.props.session.name}
          </div>
          <div className="dragon-select-list-cell">
            Breakpoints ({this.props.breakpointCount})
          </div>
        </div> */}

      </div>

    );
  }

  handleSelectSession(session) {
    this.props.handleLoadSession(session);
    this.props.history.push('session');
  }

}




export default SessionsComponent;
