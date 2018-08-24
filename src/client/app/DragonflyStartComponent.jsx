//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import React from 'react';
import { Link } from 'react-router';



class DragonflyStartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path : "not found"
    };
    this.titleCase = this.titleCase.bind(this);
  }
  
  
  componentWillMount() {
    var results = this.props.dragonfly.results;
    if (results != null) {
      this.props.history.push('dragonflycomplete');
      
    }
    
  }
  
  componentDidMount() {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host; 
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }

  render() {
    var dragonfly = this.props.dragonfly;
    var totalQuestionCount = dragonfly.session.totalQuestionCount;
    var contact = dragonfly.contact;
    var first = this.titleCase(contact.first); 
    var last = this.titleCase(contact.last); 
    var email = contact.email;
    var incentive = Number(dragonfly.incentive).toFixed(2);
    
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">
              <h2>Hello {first} {last},</h2>
              <br/><br/>
              Welcome to Dragonfly! We are beta testing our new Incentivized Information technology where we pay you to engage with information.
              <br/><br/>
              You can earn ${incentive} cash in 8 minutes if you answer {totalQuestionCount} questions correctly.
              <br/><br/>
              At the end we will pay you through the Venmo App and you can designate if you prefer payment by email or phone.
              
              <br/><br/><br/>
            
              <Link to={`dragonflyplay`} className="btn btn-primary btn-lg">Start Now <i className='fa fa-chevron-circle-right'></i></Link>
              
              </div>
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><img src="./images/logo-dragonfly-ii.png" /></div>
              </a>
              
        </div>
        <div className="col-sm-2">
        </div>
      </div>
      
    );
  }
  
  
  titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
  

}

export default DragonflyStartComponent;