import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class OrganizationsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h3>Organizations</h3>
        
        <Link to={`createorganization`}>Create Organization</Link>
      </div>
    );
  }


}

export default OrganizationsComponent;