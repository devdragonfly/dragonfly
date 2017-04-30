import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import SignInComponent from './SignInComponent.jsx';
import UserDropdownComponent from './UserDropdownComponent.jsx';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {user : 'not found', idToken : 'not found'};
        this.handleUserReceived = this.handleUserReceived.bind(this);
        this.handleIdTokenReceived = this.handleIdTokenReceived.bind(this);
    }

    handleUserReceived(cognitoUser) {
        this.setState({user : cognitoUser});
    }
    
    handleIdTokenReceived(result) {
        this.setState({idToken : result});
    }
    
    
    
    
    
    render(){
        
        
        const childrenWithProps = React.Children.map(this.props.children,
         (child) => React.cloneElement(child, {
           user: this.state.user,
           idToken: this.state.idToken,
           handleUserReceived: this.handleUserReceived,
           handleIdTokenReceived: this.handleIdTokenReceived
         })
        );
        
        var email = this.state.user.username;
        var idToken = this.state.idToken;  
        var handleUserReceived = this.handleUserReceived;
        var handleIdTokenReceived = this.handleIdTokenReceived;
        var history = this.props.history;
        var rightnav = function() { return '' }();
        
        if (idToken === 'not found') {
            rightnav = function() {return <SignInComponent handleUserReceived={handleUserReceived} handleIdTokenReceived={handleIdTokenReceived} email={email} history={history} /> }();
        } else {
            rightnav = function() {return <UserDropdownComponent handleUserReceived={handleUserReceived} handleIdTokenReceived={handleIdTokenReceived} email={email} history={history} /> }();
        }
        
        
        
        return(
            <div class="container-fluid">
                
                <div className="row dragon-navbar">
                  <div className="col-sm-6">
                    <img className="dragon-logo-img" src="images/dr-logo-white-213x50.png"/>
                  </div>
                  <div className="col-sm-6">{rightnav}</div>
                </div>
                
                
                    {childrenWithProps}
            </div>
        );
    }
}

export default Main