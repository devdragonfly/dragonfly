import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import NavOutsideComponent from './NavOutsideComponent.jsx';
import NavInsideComponent from './NavInsideComponent.jsx';
import appconfig from "./appconfig";
//const fs = require('file-system');
//const zlib = require("zlib");

var AWS = require("aws-sdk");
AWS.config.region = 'us-west-2';


const userPool = new CognitoUserPool({ UserPoolId: appconfig.UserPoolId, ClientId: appconfig.ClientId});
const AWSLogin = 'cognito-idp.' + appconfig.region + '.amazonaws.com/' + appconfig.UserPoolId;
const AWSIdentityPoolId = appconfig.IdentityPoolId;
var dragonfly = {};

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {email : '', 
                    userId : 'not found', 
                    organizations: 'not found',
                    organizationName: 'not found',
                    organizationId: 'not found',
                    contactLists: 'not found',
                    contactList: 'not found',
                    sessions: 'not found',
                    session: 'not found',
                    breakpoint: 'not found',
                    question: 'not found',
                    percent: 'not found',
                    videos: 'not found',
                    video: 'not found'
        };
        this.handleLoadEmail = this.handleLoadEmail.bind(this);
        this.handleAuthenticate = this.handleAuthenticate.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleLoadAttributes = this.handleLoadAttributes.bind(this);
        this.handleLoadOrganizations = this.handleLoadOrganizations.bind(this);
        this.handleLoadOrganization = this.handleLoadOrganization.bind(this);
        this.handleLoadContactLists = this.handleLoadContactLists.bind(this);
        this.handleLoadContactList = this.handleLoadContactList.bind(this);
        this.handleLoadContacts = this.handleLoadContacts.bind(this);
        this.handleLoadSessions = this.handleLoadSessions.bind(this);
        this.handleLoadSession = this.handleLoadSession.bind(this);
        this.handleLoadBreakpoint = this.handleLoadBreakpoint.bind(this);
        this.handleLoadQuestion = this.handleLoadQuestion.bind(this);
        this.handleLoadVideos = this.handleLoadVideos.bind(this);
        this.handleLoadVideo = this.handleLoadVideo.bind(this);
        this.dbPut = this.dbPut.bind(this);
        this.dbQuery = this.dbQuery.bind(this);
        this.dbUpdate = this.dbUpdate.bind(this);
        this.s3Upload = this.s3Upload.bind(this);
    }
    
    
    
    handleLoadEmail(email) {
        this.setState({email : email});
    }
    
    handleLoadOrganizations(result) {
        this.setState({organizations : result.Items});
    }
    
    handleLoadContactLists(result) {
        this.setState({contactLists : result.Items});
    }
    
    handleLoadContactList(contactList) {
        this.setState({contactList : contactList});
    } 
    
    handleLoadSessions(result) {
        this.setState({sessions : result.Items});
    }
    
    handleLoadVideos(result) {
        this.setState({videos : result.Items});
    }   
    
    handleLoadSession(session) {
        this.setState({session : session});
    }
    
    handleLoadVideo(video) {
        this.setState({video : video});
    }
    
    handleLoadBreakpoint(breakpoint) {
        this.setState({breakpoint : breakpoint});
    }
    
    handleLoadQuestion(question) {
        this.setState({question : question});
    }
    
    handleLoadContacts(contacts) {
        var contactList = this.state.contactList;
        contactList.contacts = contacts;
        this.setState({contactList : contactList});
    } 
    
    
    handleLoadOrganization(organizationId, organizationName) {
        this.setState({organizationId : organizationId});
        this.setState({organizationName : organizationName});
        this.setState({contactLists : 'not found'});
        this.setState({sessions : 'not found'});
        this.setState({videos : 'not found'});
    }
    
    
    
    
    
    
    
    handleAuthenticate(email, password, callback) {
        
        var myThis = this;
        var authenticationData = {Username : email, Password : password};
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userData =  {Username : email, Pool : userPool };
        var cognitoUser = new CognitoUser(userData);

        
        cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: function (result) {
                  
                  
                  
                AWS.config.region = 'us-west-2';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        //AccountId: '698305963744',
                        //RoleArn: 'arn:aws:iam::698305963744:role/Cognito_dragonflyAuth_Role', 
                        IdentityPoolId : 'us-west-2:b6311e4b-9082-4058-883c-19d23e34802b',
                        Logins : { 'cognito-idp.us-west-2.amazonaws.com/us-west-2_N8urEcZBJ' : result.getIdToken().getJwtToken() }
                });
                  
                
                dragonfly.docClient = new AWS.DynamoDB.DocumentClient();
                dragonfly.cognitoUser = cognitoUser;
                dragonfly.s3 = new AWS.S3({ apiVersion: '2006-03-01', params: {Bucket: 'dragonfly-videos'},   httpOptions: { timeout: 1000000 } });
                myThis.handleLoadAttributes(callback);
              },
       
              onFailure: function(err) {
                  if (err.code === "UserNotConfirmedException") {
                    myThis.props.history.push('confirmregistration');
                  }
                  alert(err.message);
              }
          });
        
    }
    
    
    
    handleLoadAttributes(callback) {
        var myThis = this;
        dragonfly.cognitoUser.getUserAttributes(function(err, result) {
            if (err) {
                alert(err);
                callback();
                return;
            }
            if (result) {
                var userId = result[0].getValue();
                myThis.setState({ userId : userId });
                callback();
                
              
            }
        });
    } 
    
    
    dbPut(params, callback) {

        dragonfly.docClient.put(params, function(err, data) {
          
            if (err) {
                alert(JSON.stringify(err));
                callback();
            } else {
                callback(data);
            }
        });        
    }
    
    
    
    dbQuery(params, callback) {

        dragonfly.docClient.query(params, function(err, data) {
          
            if (err) {
                alert(JSON.stringify(err));
                callback(data);
            } else {
                callback(data);
            }
        });        
    }
    
    dbUpdate(params, callback) {

        dragonfly.docClient.update(params, function(err, data) {
          
            if (err) {
                alert(JSON.stringify(err));
                callback(data);
            } else {
                callback(data);
            }
        });        
    }
    
    
    s3Upload(file, key, videoUploadFailedCallback, videoUploadedCallback) {
        var myThis = this;
        var size = file.size;
        
        var params = {Key: key, ContentType: file.type, Body: file};
        
        /*
        dragonfly.s3.upload(params, function (err, data) {
            if (err) {
                alert(JSON.stringify(err));
                callback(data);
            } else {
                callback(data);
            }
        });
        */
        
        var request = dragonfly.s3.putObject(params);
        var percent = 0;
        
        request.
          on('httpUploadProgress', function(progress, response) {
            percent = Math.round((progress.loaded / size) * 100, -2);
            myThis.setState({percent: percent});
          }).
          on('success', function(response) {
              alert("inside Main, success triggered");
            videoUploadedCallback();
          }).
          on('error', function(response) {
            alert("inside Main, error triggered");
            videoUploadFailedCallback();
          }).
          on('complete', function(response) {
            myThis.setState({percent: 'not found'});
          }).
          send();
          
        

/*
        dragonfly.s3.upload(params, function(err, data) {
          
            if (err) {
                alert(JSON.stringify(err));
                callback(data);
            } else {
                callback(data);
            }
        });        */
    }

    handleSignOut() {
        this.setState({email : ''});
        this.setState({userId : 'not found'});
        this.setState({organizations : 'not found'});
        this.setState({organizationName : 'not found'});
        this.setState({organizationId : 'not found'});
        this.setState({contactLists : 'not found'});
        this.setState({sessions : 'not found'});
        this.setState({videos : 'not found'});
    }
    
    
    

    

    
    
    
    
    render(){
        
        
        const childrenWithProps = React.Children.map(this.props.children,
         (child) => React.cloneElement(child, {
           userId: this.state.userId,
           email: this.state.email,
           organizations: this.state.organizations,
           organizationId: this.state.organizationId,
           organizationName: this.state.organizationName,
           contactLists: this.state.contactLists,
           contactList: this.state.contactList,
           sessions: this.state.sessions,
           session: this.state.session,
           breakpoint: this.state.breakpoint,
           question: this.state.question,
           videos: this.state.videos,
           handleLoadEmail: this.handleLoadEmail,
           handleUserIdReceived: this.handleUserIdReceived,
           handleLoadOrganizations: this.handleLoadOrganizations,
           handleLoadOrganization: this.handleLoadOrganization,
           handleLoadContactLists: this.handleLoadContactLists,
           handleLoadContactList: this.handleLoadContactList,
           handleLoadContacts: this.handleLoadContacts,
           handleLoadSessions: this.handleLoadSessions,
           handleLoadSession: this.handleLoadSession,
           handleLoadBreakpoint: this.handleLoadBreakpoint,
           handleLoadQuestion: this.handleLoadQuestion,
           handleLoadVideos: this.handleLoadVideos,
           dbPut: this.dbPut,
           dbQuery: this.dbQuery,
           dbUpdate: this.dbUpdate,
           s3Upload: this.s3Upload
         })
        );
        
        var email = this.state.email;
        var userId = this.state.userId;
        var percent = this.state.percent;
        var organizations = this.state.organizations;
        var organizationName = this.state.organizationName;
        var handleSignOut = this.handleSignOut;
        var handleAuthenticate = this.handleAuthenticate;
        var handleLoadEmail = this.handleLoadEmail;
        var handleLoadOrganization = this.handleLoadOrganization;
        var dbQuery = this.dbQuery;
        var history = this.props.history;
        
        
        var nav = function() { return '' }();
        
        if (userId === 'not found') {
            nav = function() {return <NavOutsideComponent handleLoadEmail={handleLoadEmail} handleAuthenticate={handleAuthenticate} email={email} history={history} /> }();
        }
        
        if (organizationName !== 'not found') {
            nav = function() {return <NavInsideComponent handleLoadOrganization={handleLoadOrganization} organizationName={organizationName}  organizations={organizations} userId={userId} email={email}   handleSignOut={handleSignOut}  history={history} percent={percent}/> }();
        }
        
        
        
        return(
            <div class="container-fluid">
                
                    {nav}
                
                    {childrenWithProps}
                    
                    <br/><br/><br/><br/><br/>
            </div>
        );
    }
}

export default Main