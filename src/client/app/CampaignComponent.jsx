import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rewardValue : ''
    };
    this.updateRewardValue = this.updateRewardValue.bind(this);
  }
  

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    var campaign = this.props.campaign;
    var session = campaign.session;
    var contactList = campaign.contactList;
    var invitesJsx = function() {return '' }();
    
    var sessionName = '';
    if (session == null) { sessionName = <Link to={`campaignselectsession`}>Select</Link>; } else { sessionName = session.name}

    var contactListName = '';
    if (contactList == null) 
      { 
        contactListName = <Link to={`campaignselectcontactlist`}>Select</Link>; 
      }  else { 
        contactListName = contactList.name
        var contacts = contactList.contacts;
        if (contacts == null){
          invitesJsx = function() {return 'No contacts added to this list yet.' }();
        } else {
          invitesJsx = contacts.map((contact, i) => {
              return <Invite contact={contact} />
          });
        }
      }
    
    
    
    

    

    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-6">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
          
            <div className="form-group row">
              <div className="col-xs-3">
                <label for="ex1"><i className='fa fa-graduation-cap fa-fw fa-lg'></i> Session</label><br/>
                 &nbsp;{sessionName}
              </div>
              <div className="col-xs-3">
                <label for="ex2"><i className='fa fa-address-book-o fa-fw fa-lg'></i> Contact List</label><br/>
                 &nbsp;{contactListName}
              </div>
              <div className="col-xs-4">
                <label for="ex3"><i className='fa fa-credit-card fa-fw fa-lg'></i> Potential Reward per Invite</label><br/>
                <input value={this.state.rewardValue} id="ex3" onChange={this.updateRewardValue} className="form-control" placeholder="dollar amount"/>
              </div>
            </div>

            
            <br/><br/>
            
            <h4>Invites</h4>
            <div className="dragon-select-list">
              {invitesJsx}
            </div>
            
          </div>
          <div className="col-sm-4">
          </div>
          
        </div>

    );
  }
  


  updateRewardValue(e) {
    this.setState({
      rewardValue: e.target.value
    });
  }



}





class Invite extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-address-card fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.first}
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.last}
          </div>
          <div className="dragon-select-list-cell">
            {this.props.contact.email}
          </div>
        </div>
    );
  }

}


export default CampaignComponent;
