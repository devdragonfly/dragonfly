import React from 'react';
import {Link} from 'react-router';
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
    
    var sessionsJsx = function() {return '' }();
    
    if (sessions !== 'not found') {
          if (sessions.length === 0) {
            sessionsJsx = function() {return 'No sessions created yet.' }();
            
          } else {
            var breakpointCount = 0;
            sessionsJsx = this.props.sessions.map((session, i) => {
                breakpointCount = 0;
                if (session.breakpoints != null) {
                  breakpointCount = session.breakpoints.length;
                }
                return <Session session={session} handleLoadSession={handleLoadSession} breakpointCount={breakpointCount} history={history}/>
            });
          }
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3>
              Sessions
            </h3>
            
            
            <div className="dragon-select-list">
              {sessionsJsx}
            </div>
            
            <br/>
            
            <Link to={`createsession`} className="btn btn-primary"><i className='fa fa-plus'></i> Create Session</Link>
            
          </div>
          <div className="col-sm-4">
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
        <div onClick={this.handleSelectSession.bind(this, this.props.session)} className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-graduation-cap fa-fw fa-lg'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.session.name}
          </div>
          <div className="dragon-select-list-cell">
            Breakpoints ({this.props.breakpointCount})
          </div>
        </div>
    );
  }
  
  handleSelectSession(session) {
    this.props.handleLoadSession(session);
    this.props.history.push('session');
  }

}




export default SessionsComponent;