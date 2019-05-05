// import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
// import React from 'react';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
// import appconfig from "./appconfig";
//
//
// const userPool = new CognitoUserPool({ UserPoolId: appconfig.UserPoolId, ClientId: appconfig.ClientId});
//
// restoreUserSession() {
//   var cognitoUser = userPool.getCurrentUser();
//   var myThis = this;
//   if (cognitoUser != null) {
//       cognitoUser.getSession(function(err, session) {
//         if (err) {
//           alert(err);
//           return;
//         }
//         console.log('session validity: ' + session.isValid());
//         myThis.props.history.push('loadorganizations');
//     });
//   }
// }
//
//
// export default function (ComposedComponent) {
//
//   // If user not authenticated render out to root
//
//   class Authentication extends Component {
//     static contextTypes = {
//       router: React.PropTypes.object
//     };
//
//     componentWillMount() {
//       if (!this.props.authenticated) {
//         this.context.router.push('/');
//       }
//     }
//
//     componentWillUpdate(nextProps) {
//       if (!nextProps.authenticated) {
//         this.context.router.push('/');
//       }
//     }
//
//     render() {
//       return <ComposedComponent {...this.props} />;
//     }
//   }
//
//   function mapStateToProps(state) {
//     return { authenticated: state.authenticated };
//   }
//
//   return connect(mapStateToProps)(Authentication);
// }
