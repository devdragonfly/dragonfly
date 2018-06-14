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
    var contact = dragonfly.contact;
    var first = this.titleCase(contact.first); 
    var last = this.titleCase(contact.last); 
    var email = contact.email;
    var reward = Number(dragonfly.reward).toFixed(2);
    
    return (
      <div className="row">
        <div className="col-sm-2">
          
        </div>
        <div className="col-sm-8">
              
              <br/><br/>
              
              <div className="jumbotron dragon-enlarge">

                <h2>Hello {first} {last},</h2>
                
                <br/>
                
                Thank you for your time.
                
                <br/><br/>
                
                The video you are about to watch is XX minutes long and you will be presented 5 questions at various points throughout it.
                
                <br/><br/>
                
                You have the opportunity to earn up to ${reward} based on how many questions you get right.
                
                <br/><br/><br/>
              
                <Link to={`dragonflyplay`} className="btn btn-primary btn-lg">Start Now <i className='fa fa-chevron-circle-right'></i></Link>
              
              </div>
              <a href={this.state.path} target="_blank">
              <div className="dragon-powered-by pull-right"><div>powered by</div> <img src="./images/dragonfly-logo.png" /></div>
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