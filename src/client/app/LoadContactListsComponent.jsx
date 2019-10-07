import React from 'react';

import AppMenuComponent from './components/base/AppMenuComponent.jsx';


class LoadContactListsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myThis = this;
    var organizationId = this.props.organizationId;

    var params = {
        TableName : "ContactLists",
        KeyConditionExpression: "#organizationId = :organizationId",
        ExpressionAttributeNames:{
            "#organizationId": "organizationId"
        },
        ExpressionAttributeValues: {
            ":organizationId":organizationId
        }
    };

    this.props.dbQuery(params, function(result) {
      var next = myThis.props.next;
      myThis.props.handleLoadContactLists(result);
      myThis.props.history.push(next);

      if ( next === 'campaignselectcontactlist') {
        var atLeastOneHasContacts = false;
        var contactLists = myThis.props.contactLists;

        for (var i = 0; i < contactLists.length; i++) {
            if (contactLists[i].contacts != null) {
              atLeastOneHasContacts = true;
            }
        }
        if (!atLeastOneHasContacts) {
          myThis.props.history.push('campaignnocontactlists');
        }
      }

    });


  }


  render() {

    var appMenu = function () { return <AppMenuComponent current="contactlists" /> }();


    return (

      <div id="loadContactListsComponent" className="page-loader-container">
        {appMenu}

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row justify-content-center">
              <div className="col page-loader">
                <i className='fas fa-circle-notch fa-spin'></i>
                <p className="loader-text">Loading Contacts...</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    );
  }

}

export default LoadContactListsComponent;
