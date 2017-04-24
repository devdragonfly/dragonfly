import React, {Component} from 'react';
import { Link } from 'react-router';

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
        
        
        
        return(
            <div>
                <Link to="/">Home</Link>
                <Link to="signin">Sign In</Link>
                <Link to="signup">Sign Up</Link>
                <Link to="confirmregistration">Confirm Registrations</Link>
                <Link to="organizations">Organizations</Link>
                {this.state.user.username}
                <div className="container">
                    {childrenWithProps}
                </div>
            </div>
        );
    }
}

export default Main