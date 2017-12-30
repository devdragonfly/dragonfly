import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";
class GenerateDragonfliesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rewardValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateRewardValue = this.updateRewardValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    var campaign = this.props.campaign;
    var session = campaign.session;
    var contactList = campaign.contactList;
    
    var sessionName = '';
    if (session == null) { sessionName = <Link to={`campaignselectsession`}>Select</Link>; } else { sessionName = session.name}

    var contactListName = '';
    if (contactList == null) 
      { 
        contactListName = <Link to={`campaignselectcontactlist`}>Select</Link>; } else { contactListName = contactList.name }
    
    
    
    

    

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
                <label for="ex3"><i className='fa fa-credit-card fa-fw fa-lg'></i> Reward per Dragonfly</label><br/>
                <input value={this.state.rewardValue} id="ex3" onChange={this.updateRewardValue} className="form-control" placeholder="dollar amount"/>
              </div>
            </div>

            
            <br/><br/>
            <form onSubmit={this.handleSubmit}>
              <input type="submit" className={this.state.buttonRestClassName} value="Generate Dragonflies" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Generating Dragonflies</div>
            </form>
            
          </div>
          <div className="col-sm-4">
          </div>
          
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
  
  updateRewardValue(e) {
    this.setState({
      rewardValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const reward = this.state.rewardValue.trim();
    const campaign = this.props.campaign;
    const organizationId = this.props.organizationId;
    const campaignId = campaign.campaignId;
    
    var contactList = campaign.contactList;
    var contacts = contactList.contacts;
    var putRequests = [];
    var dragonflies = [];
    
    for (var i = 0; i < contacts.length; i++) {
        var dragonflyId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        var dragonfly = { dragonflyId: dragonflyId, organizationId: organizationId, campaignId: campaignId, contact: contacts[i], session: campaign.session, reward: reward };
        putRequests.push({ PutRequest: { Item: dragonfly } })
        dragonflies.push(dragonfly);
        
    }

    var params = {
          RequestItems: {"Dragonflies" : putRequests, "Results" : putRequests },
          ReturnConsumedCapacity: "NONE",
          ReturnItemCollectionMetrics: "NONE"
      };
    
    

    this.props.dbBatchWrite(params, function(result) {
      myThis.showClickedButtonState(false);
      myThis.props.history.push('loadresults');
      
    });

  }
  
  

}







export default GenerateDragonfliesComponent;
