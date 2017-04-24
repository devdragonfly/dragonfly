import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class OrganizationsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        ORGANIZATIONS<br/><br/><br/><br/>
        user = {JSON.stringify(this.props.user)}<br/><br/><br/><br/>
        idToken = {JSON.stringify(this.props.idToken)}
      </div>
    );
  }


}

export default OrganizationsComponent;