import React from 'react';
import { Link } from 'react-router';

import ImageModalComponent from './components/ImageModalComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';

const buttonClassName = "btn btn-primary";
class GenerateDragonfliesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      incentiveValue: '',
      buttonRestClassName: buttonClassName,
      buttonClickedClassName: "dragon-hidden",
      logo: null,
      customTexts: {
        welcome: "custom text",
        payment: "custom text",
        complete: "custom text"
      }
    };
    this.updateIncentiveValue = this.updateIncentiveValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateIncentive = this.validateIncentive.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.updateExpirationDate = this.updateExpirationDate.bind(this);
    this.dateTomorrow = this.dateTomorrow();
  }

  render() {
    var campaign = this.props.campaign;
    var session = campaign.session;
    var contactList = campaign.contactList;

    var sessionName = '';
    if (session == null) { sessionName = <Link to={`campaignselectsession`}>Select</Link>; } else { sessionName = session.name }

    var contactListName = '';
    if (contactList == null) {
      contactListName = <Link to={`campaignselectcontactlist`}>Select</Link>;
    } else {
      contactListName = contactList.name
    }
    var appMenu = function () { return <AppMenuComponent current="campaigns" /> }();


    return (
      <div id="generate_campaign_component">
        {appMenu}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">


            {/* start */}
            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">Getting Started</h3>
                  <p><b>Campaign: </b> {this.props.campaign.name} </p>
                </div>

                <div className="page_header_action float-right">

                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>


            {/* start */}
            <div className="row">
              <div className="col-12">
                <div className="dragonfly-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <label for="ex1"><i className='far fa-play-circle fa-fw fa-lg'></i> Session</label><br />
                          &nbsp;{sessionName}
                        </div>
                        <div className="col-4">
                          <label for="ex2"><i className='fas fa-user-friends fa-fw fa-lg'></i> Contact List</label><br />
                          &nbsp;{contactListName}
                        </div>
                        <div className="col-4">
                          <label for="ex3"><i className='fas fa-dollar-sign fa-fw fa-lg'></i> Incentive per Dragonfly</label><br />
                          <input value={this.state.incentiveValue} id="ex3" onChange={this.updateIncentiveValue} className="form-control" placeholder="dollar amount" />
                        </div>
                      </div>


                      <div className="form-group">


                      </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>



            <div className="row">
              <div className="col-12">

                <div className="dragonfly-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                        {/* start */}
                        <div className="panel panel-default">

                          <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#logo" aria-expanded="true" aria-controls="collapseOne">Change Logo for company`s pages</a>
                            </h4>
                          </div>

                          {/* start */}
                          <div id="logo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                            <div className="panel-body">
                              <div className="row form-group">
                                <ImageModalComponent image="./images/screenshots/logo-intro-page.jpg" columnClass="col-md-4" />
                                <ImageModalComponent image="./images/screenshots/logo-compl-page.jpg" columnClass="col-md-4" />
                                <ImageModalComponent image="./images/screenshots/logo-confirm-page.jpg" columnClass="col-md-4" />
                              </div>
                              <div className="row form-group">
                                <div className="col-md-12">
                                  <div className="input-group">
                                    <label className="input-group-btn">
                                      <span className="btn btn-primary">
                                        Choose File <input type="file" accept="image/*" style={{ display: 'none' }} onChange={this.handleFile} />
                                      </span>
                                    </label>
                                    <input type="text" className="form-control bg-white" placeholder="Select the Logo File" value={this.state.logo ? this.state.logo.name : ''} readOnly />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end */}

                        </div>
                        {/* end */}


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
                                <ImageModalComponent image="./images/screenshots/text-intro-page.jpg" columnClass="col-md-4" />
                              </div>
                              <div className="row">
                                <div className="col-md-10 form-group">
                                  <label for="intro1">Welcome Line</label><br />
                                  <textarea id="intro1" className="form-control" value={this.state.customTexts.welcome} onChange={this.handleTextareaChange} name="welcome" rows="3" placeholder="custom text"></textarea>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-10 form-group" >
                                  <label for="intro2">Payment Info</label><br />
                                  <textarea id="intro2" className="form-control" value={this.state.customTexts.payment} onChange={this.handleTextareaChange} name="payment" rows="3" placeholder="custom text"></textarea>
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
                                <ImageModalComponent image="./images/screenshots/text-conf-page.jpg" columnClass="col-md-4" />
                              </div>
                              <div className="row">
                                <div className="col-md-10 form-group">
                                  <label for="confirm1">Custom Text</label><br />
                                  <textarea id="confirm1" className="form-control" value={this.state.customTexts.complete} onChange={this.handleTextareaChange} name="complete" rows="3" placeholder="Custom text"></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* start  */}
            <div className="row">
              <div className="col-12">

                <div className="dragonfly-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <div className="col-xs-6">
                          <label for="exp_date">
                            <i className='far fa-calendar-times fa-fw fa-lg'></i>
                            Campaign Expiration Date
                </label>
                          <br />
                          <input id="exp_date" onChange={this.updateExpirationDate} className="form-control" min={this.dateTomorrow} type="date" />
                          <span className="generate-dragonfly__hind-text">Campaign becomes unaccessible on a selected date at 00:00:00 GTM-4</span>
                        </div>
                        <div className="col-xs-6">
                          <input type="checkbox" id="myCheck"></input>: Manual Delivery
              </div>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                        <input type="submit" className={this.state.buttonRestClassName} value="Generate Dragonflies" />
                        <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Generating Dragonflies</div>
                      </form>

                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}

          </div>



        </div>
      </div>

    );
  }

  handleTextareaChange(e) {
    var inputName = e.target.name;
    var inputValue = e.target.value;
    var statusCopy = Object.assign({}, this.state);

    statusCopy.customTexts[inputName] = inputValue;
    this.setState(statusCopy);
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

  checkBoxState() {
    var x = document.getElementById("myCheck").checked;
    if (x == true) return true;
    else return false; // return x;
  }

  updateIncentiveValue(e) {
    this.setState({
      incentiveValue: e.target.value
    });
  }

  updateExpirationDate(e) {
    this.setState({
      expirationDate: e.target.value
    });
  }

  validateIncentive(incentive) {
    var isNumeric = !isNaN(parseFloat(incentive)) && isFinite(incentive);
    if (!isNumeric) return false;
    if (incentive > 200) return false;
    return true;
  }

  isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  handleFile(e) {
    if (this.isFileImage(e.target.files[0])) {
      this.setState({ logo: e.target.files[0] });
    } else {
      this.setState({ logo: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;
    const campaign = this.props.campaign;
    const incentive = this.state.incentiveValue.trim();
    const customTexts = this.state.customTexts;
    const expirationDate = this.state.expirationDate;

    if (campaign.session == null || campaign.contactList == null || expirationDate == null) {
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
    var logoId = null;

    if (this.state.logo) {
      logoId = this.createId();
      let params = {
        Bucket: 'dragonfly-logos',
        Key: logoId,
        ContentType: this.state.logo.type,
        Body: this.state.logo
      };
      this.props.s3UploadLogos(params, function (err, data) {
        if (err) {
          alert(JSON.stringify(err));
        } {
          logoId = null
        }
      });
    }
    var params = {
      TableName: "Campaigns",
      Key: {
        organizationId: organizationId,
        campaignId: campaignId
      },
      UpdateExpression: "set logoId = :logoId, expirationDate = :expirationDate",
      ExpressionAttributeValues: {
        ":logoId": logoId,
        ":expirationDate": expirationDate
      },
      ReturnValues: "UPDATED_NEW"
    };
    myThis.props.dbUpdate(params, function (result) {
      myThis.createDragonfly(organizationId, campaignId, contacts, campaign, incentive, customTexts, logoId);
    });
  }

  dateTomorrow(hey, nope) {
    var date = new Date;
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }

  createDragonfly(organizationId, campaignId, contacts, campaign, incentive, customTexts, logoId) {
    var myThis = this;
    var putRequests = [];
    var dragonflies = [];
    var campaign = myThis.props.campaign;


    for (var i = 0; i < contacts.length; i++) {
      var dragonflyId = myThis.createId();
      var dragonfly = {
        dragonflyId: dragonflyId,
        organizationId: organizationId,
        campaignId: campaignId,
        contact: contacts[i],
        session: campaign.session,
        incentive: incentive,
        customTexts: customTexts,
        checkbox: this.checkBoxState(),
        date_sent: new Date().toISOString()
      };
      if (logoId) {
        dragonfly.logoId = logoId;
      }
      putRequests.push({
        PutRequest: {
          Item: dragonfly
        }
      })
      dragonflies.push(dragonfly);


      //Upload first 10 Items
      if (i > 1 && i % 9 == 0) {

        
        var params = {
          RequestItems: { "Dragonflies": putRequests, "Results": putRequests },
          ReturnConsumedCapacity: "NONE",
          ReturnItemCollectionMetrics: "NONE"
        };

        myThis.props.dbBatchWrite(params, function (result) {
          // myThis.showClickedButtonState(false);
    
          // campaign.expirationDate = myThis.state.expirationDate;
          // myThis.props.handleLoadCampaign(campaign);
    
          // myThis.props.history.push('loadresults');
          console.log("Uploaded Segment of batch");
        });

        putRequests = [];
      }
    }

    if (putRequests.length > 0) {
      var params = {
        RequestItems: { "Dragonflies": putRequests, "Results": putRequests },
        ReturnConsumedCapacity: "NONE",
        ReturnItemCollectionMetrics: "NONE"
      };

      myThis.props.dbBatchWrite(params, function (result) {
        myThis.showClickedButtonState(false);
  
        campaign.expirationDate = myThis.state.expirationDate;
        myThis.props.handleLoadCampaign(campaign);
  
        myThis.props.history.push('loadresults');
      });

    }

    mixpanel.track('Generating Dragonfly Links', {
      'OrganizationId': organizationId,
      'CampaignId': campaignId,
      'CampaignName': campaign.name,
      'CustomTexts': customTexts
    });

    campaign.expirationDate = myThis.state.expirationDate;
    myThis.props.handleLoadCampaign(campaign);

    myThis.props.history.push('loadresults');

    
    
  }

  createId() {
    return 'Axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

export default GenerateDragonfliesComponent;
