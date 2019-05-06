import React from 'react';
import { Link } from 'react-router';

import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import  ImageModalComponent from './components/ImageModalComponent.jsx';

const buttonClassName = "btn btn-primary";
class GenerateDragonfliesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {incentiveValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateIncentiveValue = this.updateIncentiveValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateIncentive = this.validateIncentive.bind(this);
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
      contactListName = <Link to={`campaignselectcontactlist`}>Select</Link>; } else { contactListName = contactList.name
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
              <label for="ex3"><i className='fa fa-credit-card fa-fw fa-lg'></i> Incentive per Dragonfly</label><br/>
              <input value={this.state.incentiveValue} id="ex3" onChange={this.updateIncentiveValue} className="form-control" placeholder="dollar amount"/>
            </div>
          </div>
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" href="#logo" aria-expanded="true" aria-controls="collapseOne">
                    Change Logo for company`s pages
                  </a>
                </h4>
              </div>
              <div id="logo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div className="panel-body">
                  <div className="row form-group">
                    <ImageModalComponent image="./images/screenshots/logo-intro-page.jpg" columnClass="col-md-4"/>
                    <ImageModalComponent image="./images/screenshots/logo-compl-page.jpg" columnClass="col-md-4"/>
                    <ImageModalComponent image="./images/screenshots/logo-intro-page.jpg" columnClass="col-md-4"/>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <div className="input-group">
                        <label className="input-group-btn">
                          <span className="btn btn-primary">
                            Choose File <input type="file" style={{ display: 'none'}}/>
                          </span>
                        </label>
                        <input type="text" className="form-control" placeholder="Select the Logo File" readOnly/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingTwo">
                <h4 className="panel-title">
                  <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#introPage" aria-expanded="false" aria-controls="collapseTwo">
                    Introduction page
                  </a>
                </h4>
              </div>
              <div id="introPage" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div className="panel-body">
                  <div className="row form-group">
                    <ImageModalComponent image="./images/screenshots/text-intro-page.jpg" columnClass="col-md-4"/>
                  </div>
                  <div className="row">
                    <div className="col-md-10 form-group">
                      <label for="intro1">Welcome Line</label><br/>
                      <textarea id="intro1" className="form-control" rows="3" placeholder="custom text"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10 form-group" >
                      <label for="intro2">Payment Info</label><br/>
                      <textarea id="intro2" className="form-control" rows="3" placeholder="custom text"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingThree">
                <h4 className="panel-title">
                  <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#confirmPage" aria-expanded="false" aria-controls="collapseThree">
                    Confirmation page
                  </a>
                </h4>
              </div>
              <div id="confirmPage" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div className="panel-body">
                  <div className="row form-group">
                    <ImageModalComponent image="./images/screenshots/text-conf-page.jpg" columnClass="col-md-4"/>
                  </div>
                  <div className="row">
                    <div className="col-md-10 form-group">
                      <label for="confirm1">Custom Text</label><br/>
                      <textarea id="confirm1" className="form-control" rows="3" placeholder="Custom text"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/><br/>
          <form onSubmit={this.handleSubmit}>
            <input type="submit" className={this.state.buttonRestClassName} value="Generate Dragonflies" />
            <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Generating Dragonflies</div>
          </form>
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
  
  updateIncentiveValue(e) {
    this.setState({
      incentiveValue: e.target.value
    });
  }
  
  validateIncentive(incentive) {
    var isNumeric = !isNaN(parseFloat(incentive)) && isFinite(incentive);
    if (!isNumeric) return false;
    if (incentive > 200) return false;
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const campaign = this.props.campaign;
    const incentive = this.state.incentiveValue.trim();
    
    if (campaign.session == null) {
      myThis.showClickedButtonState(false);
      return;
    }
    
    if (campaign.contactList == null) {
      myThis.showClickedButtonState(false);
      return;
    }
    
    
    var incentiveIsValid = this.validateIncentive(incentive);
    if (!incentiveIsValid) {
      myThis.showClickedButtonState(false);
      return;
    }
    
    

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
        var dragonfly = { dragonflyId: dragonflyId, organizationId: organizationId, campaignId: campaignId, contact: contacts[i], session: campaign.session, incentive: incentive };
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
