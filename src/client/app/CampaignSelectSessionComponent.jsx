import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class CampaignSelectSessionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelectSession = this.handleSelectSession.bind(this);
  }
  
  componentWillMount() {
    var sessions = this.props.sessions;
    if (sessions == 'not found') {
      this.props.handleLoadNext('campaignselectsession');
      this.props.history.push('loadsessions');
    }
    if (sessions.length === 0) {
      this.props.history.push('campaignnosessions');
    }
    
  }

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    var sessions = this.props.sessions;
    var handleSelectSession = this.handleSelectSession;
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
                return <Session session={session} handleSelectSession={handleSelectSession} breakpointCount={breakpointCount}/>
            });
          }
    }
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-6">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
            Select a Session for the Campaign:
            <br/><br/>
            
          <div className="dragon-select-list">
              {sessionsJsx}
          </div>
          
          <br/><br/>
            If you have not created the Session for this Campaign yet, &nbsp;
            <Link to={`createsession`}>click here</Link>
            &nbsp; to create it now.
          <br/><br/>
            
          </div>
          <div className="col-sm-4">
          </div>
        </div>

    );
  }
  


  handleSelectSession(session) {
    var campaign = this.props.campaign;
    campaign.session = session;
    this.props.handleLoadCampaign(campaign);
    this.props.history.push('campaign');
  }
  

}






class Session extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div onClick={this.selectSession.bind(this, this.props.session)} className="dragon-select-list-row dragon-pointer">
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
  
  selectSession(session) {
    this.props.handleSelectSession(session);
  }

}



export default CampaignSelectSessionComponent;