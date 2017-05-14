import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


class CampaignsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (

        <div className="row">
          <div className="col-sm-2">
          <br/><br/>
            <div className="dragon-left-menu">
              <Link to={`campaigns`}><i className='fa fa-line-chart'></i>&nbsp; Campaigns</Link><br/><br/>
              <Link to={`sessions`}><i className='fa fa-file-movie-o'></i>&nbsp; Sessions</Link><br/><br/>
              <Link to={`contactlists`}><i className='fa fa-address-card-o'></i>&nbsp; Contact Lists</Link><br/><br/>
              <Link to={`settings`}><i className='fa fa-gear'></i>&nbsp; Settings</Link><br/><br/>
            </div>
          </div> 
          <div className="col-sm-10">
            <h3>Campaigns</h3>
          </div>
        </div>



    );
  }


}

export default CampaignsComponent;