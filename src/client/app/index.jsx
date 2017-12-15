import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './Main.jsx';
import SignUpComponent from './SignUpComponent.jsx';
import ConfirmRegistrationComponent from './ConfirmRegistrationComponent.jsx';
import ResendCodeComponent from './ResendCodeComponent.jsx';
import SuccessCodeVerifiedComponent from './SuccessCodeVerifiedComponent.jsx';
import AccessAccountComponent from './AccessAccountComponent.jsx';
import CreateNewPasswordComponent from './CreateNewPasswordComponent.jsx';
import SuccessPasswordSavedComponent from './SuccessPasswordSavedComponent.jsx';
import LoadOrganizationsComponent from './LoadOrganizationsComponent.jsx';
import LoadOrganizationComponent from './LoadOrganizationComponent.jsx';
import CreateOrganizationComponent from './CreateOrganizationComponent.jsx';
import ProfileComponent from './ProfileComponent.jsx';
import CampaignsComponent from './CampaignsComponent.jsx';
import SessionsComponent from './SessionsComponent.jsx';
import ContactListsComponent from './ContactListsComponent.jsx';
import SettingsComponent from './SettingsComponent.jsx';
import CreateContactListComponent from './CreateContactListComponent.jsx';
import OrganizationNameComponent from './OrganizationNameComponent.jsx';
import LoadContactListsComponent from './LoadContactListsComponent.jsx';
import ContactListComponent from './ContactListComponent.jsx';
import AddContactsComponent from './AddContactsComponent.jsx';
import LoadSessionsComponent from './LoadSessionsComponent.jsx';
import CreateSessionComponent from './CreateSessionComponent.jsx';
import SessionComponent from './SessionComponent.jsx';
import AddQuestionComponent from './AddQuestionComponent.jsx';
import EditQuestionComponent from './EditQuestionComponent.jsx';
import UploadVideoComponent from './UploadVideoComponent.jsx';
import VideosComponent from './VideosComponent.jsx';
import LoadVideosComponent from './LoadVideosComponent.jsx';
import VideoComponent from './VideoComponent.jsx';
import SelectVideoComponent from './SelectVideoComponent.jsx';
import LoadThumbnailsComponent from './LoadThumbnailsComponent.jsx';
import PreviewComponent from './PreviewComponent.jsx';
import PreviewQuestionComponent from './PreviewQuestionComponent.jsx';
import CreateCampaignComponent from './CreateCampaignComponent.jsx';
import LoadCampaignsComponent from './LoadCampaignsComponent.jsx';
import CampaignComponent from './CampaignComponent.jsx';
import CampaignSelectSessionComponent from './CampaignSelectSessionComponent.jsx';
import CampaignNoSessionsComponent from './CampaignNoSessionsComponent.jsx';
import CampaignSelectContactListComponent from './CampaignSelectContactListComponent.jsx';
import CampaignNoContactListsComponent from './CampaignNoContactListsComponent.jsx';


render(
    <Router>
        <Route path="/" component={Main} history={browserHistory}>
            <IndexRoute component={SignUpComponent} />
            <Route path="" component={SignUpComponent}/>
            <Route path="signup" component={SignUpComponent} />
            <Route path="confirmregistration" component={ConfirmRegistrationComponent}/>
            <Route path="successcodeverified" component={SuccessCodeVerifiedComponent}/>
            <Route path="resendcode" component={ResendCodeComponent}/>
            <Route path="accessaccount" component={AccessAccountComponent}/>
            <Route path="createnewpassword" component={CreateNewPasswordComponent}/>
            <Route path="successpasswordsaved" component={SuccessPasswordSavedComponent}/>
            <Route path="loadorganizations" component={LoadOrganizationsComponent}/>
            <Route path="loadorganization" component={LoadOrganizationComponent}/>
            <Route path="createorganization" component={CreateOrganizationComponent}/>
            <Route path="profile" component={ProfileComponent}/>
            <Route path="campaigns" component={CampaignsComponent}/>
            <Route path="sessions" component={SessionsComponent}/>
            <Route path="videos" component={VideosComponent}/>
            <Route path="video" component={VideoComponent}/>
            <Route path="contactlists" component={ContactListsComponent}/>
            <Route path="settings" component={SettingsComponent}/>
            <Route path="createcontactlist" component={CreateContactListComponent}/>
            <Route path="organizationname" component={OrganizationNameComponent}/>
            <Route path="loadcontactlists" component={LoadContactListsComponent}/>
            <Route path="contactlist" component={ContactListComponent}/>
            <Route path="addcontacts" component={AddContactsComponent}/>
            <Route path="loadsessions" component={LoadSessionsComponent}/>
            <Route path="createsession" component={CreateSessionComponent}/>
            <Route path="session" component={SessionComponent}/>
            <Route path="addquestion" component={AddQuestionComponent}/>
            <Route path="editquestion" component={EditQuestionComponent}/>
            <Route path="uploadvideo" component={UploadVideoComponent}/>
            <Route path="loadvideos" component={LoadVideosComponent}/>
            <Route path="selectvideo" component={SelectVideoComponent}/>
            <Route path="loadthumbnails" component={LoadThumbnailsComponent}/>
            <Route path="preview" component={PreviewComponent}/>
            <Route path="previewquestion" component={PreviewQuestionComponent}/>
            <Route path="createcampaign" component={CreateCampaignComponent}/>
            <Route path="loadcampaigns" component={LoadCampaignsComponent}/>
            <Route path="campaign" component={CampaignComponent}/>
            <Route path="campaignselectsession" component={CampaignSelectSessionComponent}/>
            <Route path="campaignnosessions" component={CampaignNoSessionsComponent}/>
            <Route path="campaignselectcontactlist" component={CampaignSelectContactListComponent}/>
            <Route path="campaignnocontactlists" component={CampaignNoContactListsComponent}/>
            
            
            
        </Route>
    </Router>,
    document.getElementById('container')
);