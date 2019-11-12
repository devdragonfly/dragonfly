import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    // var organizationMenu = function() {return <OrganizationMenuComponent current="settings" /> }();
    var appMenu = function () { return <AppMenuComponent current="settings" /> }();


    return (

      <div className="settings-container">
        {appMenu}

        <div className="row justify-content-center">

          <div className="col-12 col-lg-10">

            <div className="row page_header_container">
              <div className="col-12">
                <div className="page_header_title float-left">
                  <h3 className="page-title">My Account</h3>
                  {/* <p>You have <b>{numContactLists}</b> contact lists.</p> */}
                </div>

                <div className="page_header_action float-right">
                  {/* <Link to={`createcontactlist`} className="btn btn-primary float-right"><i className='fa fa-plus'></i> Create Contact List</Link> */}
                </div>
                <div className="clearfix"></div>
                <hr className="page_header_divider" />
              </div>
            </div>



            {/* Section Header */}
            <div className="row page-section-header-container">
              <div className="col-12">

                <div className="page-section-header float-left">
                  <h4 className="page-section-title">My Organization</h4>
                </div>

                <div className="page-section-header-actions float-right">
                </div>

                <div className="clearfix"></div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4 col-lg-3 campaign-cards-container">

                <div id="sessionCardComponent" className="">
                  <div className="dragonfly-card">
                    <div className="card">
                      <div className="card-body">

                        <h5 className="card-title">{this.props.organizationName}</h5>
                        {/* <h6 className="card-subtitle mb-0"><i className="fas fa-film"></i> {videoName}</h6> */}

                        <div className="card-action-links">
                          {/* <a className="card-link link-video-view"><i className="fab fa-youtube"></i> View</a> */}
                          <Link to={`organizationname`} className="card-link link-video-edit"><i className="fas fa-pencil-alt"></i> Edit Name</Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            



          </div>
        </div>

      </div>




    );
  }


}

export default SettingsComponent;