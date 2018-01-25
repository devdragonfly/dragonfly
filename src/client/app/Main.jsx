import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import NavOutsideComponent from './NavOutsideComponent.jsx';
import NavInsideComponent from './NavInsideComponent.jsx';
import appconfig from "./appconfig";
//const fs = require('file-system');
//const zlib = require("zlib");

var AWS_unauth = require("aws-sdk");
var dragonfly_unauth = {};
const userPool_unauth = new CognitoUserPool({ UserPoolId: appconfig.UserPoolId, ClientId: appconfig.ClientId});
AWS_unauth.config.region = 'us-west-2';
AWS_unauth.config.credentials = new AWS_unauth.CognitoIdentityCredentials({
    AccountId: '698305963744',
    RoleArn: 'arn:aws:iam::698305963744:role/Cognito_dragonflyUnauth_Role', 
    IdentityPoolId : 'us-west-2:b6311e4b-9082-4058-883c-19d23e34802b'
});
dragonfly_unauth.docClient = new AWS_unauth.DynamoDB.DocumentClient();


var AWS = require("aws-sdk");
var dragonfly = {};
const userPool = new CognitoUserPool({ UserPoolId: appconfig.UserPoolId, ClientId: appconfig.ClientId});



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {email : '', 
                    userId : 'not found', 
                    organizations: 'not found',
                    organizationName: 'not found',
                    organizationId: 'not found',
                    campaigns: 'not found',
                    campaign: 'not found',
                    results: 'not found',
                    contactLists: 'not found',
                    contactList: 'not found',
                    sessions: 'not found',
                    session: 'not found',
                    breakpoint: 'not found',
                    question: 'not found',
                    percent: 'not found',
                    videos: 'not found',
                    video: 'not found',
                    next: 'not found',
                    preview: 'not found',
                    dragonflyId: 'not found',
                    dragonfly: 'not found'
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
        this.handleLoadPreview = this.handleLoadPreview.bind(this);
        this.handleVideoStatusUpdate = this.handleVideoStatusUpdate.bind(this);
        this.handleLoadCampaigns = this.handleLoadCampaigns.bind(this);
        this.handleLoadCampaign = this.handleLoadCampaign.bind(this);
        this.handleLoadResults = this.handleLoadResults.bind(this);
        this.handleLoadDragonflyId = this.handleLoadDragonflyId.bind(this);
        this.handleLoadDragonfly = this.handleLoadDragonfly.bind(this);
        this.dbPut = this.dbPut.bind(this);
        this.dbBatchWrite = this.dbBatchWrite.bind(this);
        this.dbQuery = this.dbQuery.bind(this);
        this.dbQueryUnauth = this.dbQueryUnauth.bind(this);
        this.dbUpdate = this.dbUpdate.bind(this);
        this.s3Upload = this.s3Upload.bind(this);
        this.s3ListObjects = this.s3ListObjects.bind(this);
        this.handleLoadNext = this.handleLoadNext.bind(this);
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
    
    handleLoadCampaigns(result) {
        this.setState({campaigns : result.Items});
    }
    
    handleLoadCampaign(campaign) {
        this.setState({campaign : campaign});
    }
    
    
    handleLoadResults(results) {
        this.setState({results : results});
    }    

    handleLoadDragonflyId(dragonflyId) {
        this.setState({dragonflyId : dragonflyId});
    } 
    
    handleLoadDragonfly(result) {
        this.setState({dragonfly : result.Items});
    } 
    
    handleLoadVideos(result) {
        this.setState({videos : result.Items});
    }   
    
    handleLoadPreview(preview) {
        this.setState({preview : preview});
    }   
    
    handleLoadSession(session) {
        if ((session.video == null) || (session.video == "not found")) {
            session.video = {name:"No Video Selected", videoId:"not found"};
            session.thumbnails = [];
            session.thumbnailState = "none";
        }
        if (session.thumbnails == null) {
            session.thumbnails = [];
            session.thumbnailState = "unknown";
        }
        this.setState({session : session});
    }
    
    handleLoadVideo(video) {
        this.setState({video : video});
    }
    
    handleVideoStatusUpdate(videoId, status) {
        var videos = this.state.videos;
        for (var i = 0; i < videos.length; i++) {
            if (videos[i].videoId == videoId) {
                videos[i].uploadStatus = status;
            }
        }
        this.setState({videos : videos});
        
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
    
    
    handleLoadNext(next) {
        this.setState({next : next});
    }
    
    
    handleLoadOrganization(organizationId, organizationName) {
        this.setState({organizationId : organizationId});
        this.setState({organizationName : organizationName});
        this.setState({campaigns : 'not found'});
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
    
    
     dbBatchWrite(params, callback) {

        dragonfly.docClient.batchWrite(params, function(err, data) {
          
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
    
    dbQueryUnauth(params, callback, doNotRetry) {
        var myThis = this;
        dragonfly_unauth.docClient.query(params, function(err, data) {
          
            if (err) {
                if (doNotRetry) {
                    alert(JSON.stringify(err));
                    callback(data);
                } else {
                    myThis.dbQueryUnauth(params, callback, true);
                }
                
                
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
        
        var request = dragonfly.s3.putObject(params);
        var percent = 0;
        
        request.
          on('httpUploadProgress', function(progress, response) {
            percent = Math.round((progress.loaded / size) * 100, -2);
            myThis.setState({percent: percent});
          }).
          on('success', function(response) {
            videoUploadedCallback();
          }).
          on('error', function(response) {
            videoUploadFailedCallback();
          }).
          on('complete', function(response) {
            myThis.setState({percent: 'not found'});
          }).
          send();
          
    }
    
    
    s3ListObjects(params, callback) {
        dragonfly.s3.listObjects(params, function (err, data) {
            callback(err,data);
        });
    }
    
    
    handleSignOut() {
        this.setState({email : ''});
        this.setState({userId : 'not found'});
        this.setState({organizations : 'not found'});
        this.setState({organizationName : 'not found'});
        this.setState({organizationId : 'not found'});
        this.setState({campaigns : 'not found'});
        this.setState({contactLists : 'not found'});
        this.setState({sessions : 'not found'});
        this.setState({videos : 'not found'});
        this.setState({dragonflyId : 'not found'});
    }
    
    
    

    

    
    
    
    
    render(){
        
        
        const childrenWithProps = React.Children.map(this.props.children,
         (child) => React.cloneElement(child, {
           userId: this.state.userId,
           email: this.state.email,
           organizations: this.state.organizations,
           organizationId: this.state.organizationId,
           organizationName: this.state.organizationName,
           campaigns: this.state.campaigns,
           campaign: this.state.campaign,
           results: this.state.results,
           dragonflyId: this.state.dragonflyId,
           dragonfly: this.state.dragonfly,
           contactLists: this.state.contactLists,
           contactList: this.state.contactList,
           sessions: this.state.sessions,
           session: this.state.session,
           breakpoint: this.state.breakpoint,
           question: this.state.question,
           videos: this.state.videos,
           video: this.state.video,
           next: this.state.next,
           preview: this.state.preview,
           handleLoadEmail: this.handleLoadEmail,
           handleUserIdReceived: this.handleUserIdReceived,
           handleLoadOrganizations: this.handleLoadOrganizations,
           handleLoadOrganization: this.handleLoadOrganization,
           handleLoadCampaigns: this.handleLoadCampaigns,
           handleLoadCampaign: this.handleLoadCampaign,
           handleLoadResults: this.handleLoadResults,
           handleLoadContactLists: this.handleLoadContactLists,
           handleLoadContactList: this.handleLoadContactList,
           handleLoadContacts: this.handleLoadContacts,
           handleLoadSessions: this.handleLoadSessions,
           handleLoadSession: this.handleLoadSession,
           handleLoadBreakpoint: this.handleLoadBreakpoint,
           handleLoadQuestion: this.handleLoadQuestion,
           handleLoadVideos: this.handleLoadVideos,
           handleLoadVideo: this.handleLoadVideo,
           handleVideoStatusUpdate: this.handleVideoStatusUpdate,
           handleLoadNext: this.handleLoadNext,
           handleLoadPreview: this.handleLoadPreview,
           handleLoadDragonflyId: this.handleLoadDragonflyId,
           handleLoadDragonfly: this.handleLoadDragonfly,
           handleSignOut: this.handleSignOut,
           dbPut: this.dbPut,
           dbBatchWrite: this.dbBatchWrite,
           dbQuery: this.dbQuery,
           dbQueryUnauth: this.dbQueryUnauth,
           dbUpdate: this.dbUpdate,
           s3Upload: this.s3Upload,
           s3ListObjects: this.s3ListObjects
         })
        );
        
        var dragonflyId = this.state.dragonflyId;
        var email = this.state.email;
        var userId = this.state.userId;
        var percent = this.state.percent;
        var organizations = this.state.organizations;
        var organizationName = this.state.organizationName;
        var handleSignOut = this.handleSignOut;
        var handleAuthenticate = this.handleAuthenticate;
        var handleLoadEmail = this.handleLoadEmail;
        var handleLoadOrganization = this.handleLoadOrganization;
        var history = this.props.history;
        
        
        var nav = function() { return '' }();
        
        if (userId === 'not found') {
            nav = function() {return <NavOutsideComponent handleLoadEmail={handleLoadEmail} handleAuthenticate={handleAuthenticate} email={email} history={history} /> }();
        }
        
        if (organizationName !== 'not found') {
            nav = function() {return <NavInsideComponent handleLoadOrganization={handleLoadOrganization} organizationName={organizationName}  organizations={organizations} userId={userId} email={email}   handleSignOut={handleSignOut}  history={history} percent={percent}/> }();
        }
        
        if (dragonflyId !== 'not found') {
            nav = function() { return '' }();
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