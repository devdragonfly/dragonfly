import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import BreakpointComponent from './BreakpointComponent.jsx';
import MillisecondsComponent from './MillisecondsComponent.jsx';


const buttonClassName = "btn btn-primary";

class SessionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {milliseconds : 0,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateMilliseconds = this.updateMilliseconds.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    var breakpoints = this.props.session.breakpoints;
    var history = this.props.history;
    var milliseconds = this.state.milliseconds;
    var handleLoadBreakpoint = this.props.handleLoadBreakpoint;
    var handleLoadQuestion = this.props.handleLoadQuestion;
    
    var breakpointsJsx = function() {return '' }();

    if (breakpoints == null){
      breakpointsJsx = function() {return 'No breakpoints added to this session yet.' }();
    } else {
      breakpointsJsx = breakpoints.map((breakpoint, i) => {
          return <BreakpointComponent breakpoint={breakpoint} handleLoadBreakpoint={handleLoadBreakpoint} handleLoadQuestion={handleLoadQuestion} history={history}/>;
      });
      
    }
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    var millisecondsJsx = function() {return <MillisecondsComponent milliseconds={milliseconds} /> }();

    return (

        <div className="row">
          {organizationMenu}
          
          
          
          <div className="col-sm-6">
            <form onSubmit={this.handleSubmit}>
                <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
                
                <div className="dragon-breakpoints">
                  {breakpointsJsx}
                </div>
                
                <br/><br/>
                
                {millisecondsJsx}
                <br/>
                
                <input type="range" min="0" max="100000" step="1" value={this.state.milliseconds} onChange={this.updateMilliseconds}/>
                <br/>
                
              <input type="submit" className={this.state.buttonRestClassName} value="Add Breakpoint" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Breakpoint</div>
            </form>
            
          </div> 
          
          
          <div className="col-sm-4">
          </div>

        </div>



    );
  }

  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
    }
  }
  
  updateMilliseconds(e) {
    this.setState({
      milliseconds: e.target.value
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const milliseconds = this.state.milliseconds;
    const organizationId = this.props.organizationId;
    const sessionId = this.props.session.sessionId;
    var session = this.props.session;
    
    var breakpointId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    

    
    var breakpoint = { breakpointId: breakpointId, milliseconds : milliseconds};
    var breakpoints = [];
    
    if (this.props.session.breakpoints != null) {
      breakpoints = this.props.session.breakpoints;
    }
    
    breakpoints.push(breakpoint);
   
    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set breakpoints = :breakpoints",
            ExpressionAttributeValues:{
                ":breakpoints" : breakpoints
            },
            ReturnValues:"UPDATED_NEW"
        };
    

    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      session.breakpoints = breakpoints;
      myThis.props.handleLoadSession(session);
    });
    
  }






}



export default SessionComponent;