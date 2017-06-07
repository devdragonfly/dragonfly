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
            var questionCount = 0;
            sessionsJsx = this.props.sessions.map((session, i) => {
                questionCount = 0;
                if (session.questions != null) {
                  questionCount = session.questions.length;
                }
                return <Session session={session} handleLoadSession={handleLoadSession} questionCount={questionCount} history={history}/>
            });
          }
    }
    
    if (sessions.length === 0) {
      
      
    }

    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-10">
            <h3>
              Sessions
            </h3>
            
            
            <div className="dragon-select-list">
              {sessionsJsx}
            </div>
            
            
            <Link to={`createsession`} className="btn btn-primary"><i className='fa fa-plus'></i> Create Session</Link>
            
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
            <i className='fa fa-file-video-o fa-fw fa-lg'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.session.name}
          </div>
          <div className="dragon-select-list-cell">
            Questions ({this.props.questionCount})
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