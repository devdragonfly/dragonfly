import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


const buttonClassName = "btn btn-primary btn-sm";

class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {emailValue : props.email, 
                  passwordValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
                  
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
  } 

  render() {

    
    return (
      <div className="dragon-login-box">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
            <span>&nbsp;</span>
          </div>
          
          <div className="form-group">
            <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-sm"/>&nbsp;&nbsp;<br/>
            <Link to={`accessaccount`}>forgot password?</Link>
          </div>
          
          <div className="form-group">
            <input type="submit" className={this.state.buttonRestClassName} value="Sign In" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Signing In</div>
            <br/>
            <span>&nbsp;</span>
          </div>
            
        </form>
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

  updateEmailValue(e) {
    this.setState({
      emailValue: e.target.value
    });
  }
  
  updatePasswordValue(e) {
    this.setState({
      passwordValue: e.target.value
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    
    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();
    
    this.props.handleLoadEmail(email);
    this.props.handleAuthenticate(email, password, function(){
      myThis.showClickedButtonState(false);
      myThis.props.history.push('loadorganizations');
    });
    

  }
}

export default SignInComponent;