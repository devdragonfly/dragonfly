import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path : "not found"
    };

  }
  
  
  componentWillMount() {
    var results = this.props.results;
    if (results.Count == 0) {
      this.props.history.push('generatedragonflies');
    }
  }
  
  componentDidMount() {
    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host; 
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }

  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="campaigns" /> }();
    var path = this.state.path;
    
    
    
    var dragonflies = this.props.results;
    
    var dragonfliesJsx = function() {return '' }();
    
    if (dragonflies !== 'not found') {
          dragonflies = dragonflies.Items;
          if (dragonflies.length === 0) {
            dragonfliesJsx = function() {return 'ERROR: No dragonflies created.' }();
            
          } else {
            dragonfliesJsx = dragonflies.map((dragonfly, i) => {
                return <Dragonfly dragonfly={dragonfly} path={path}/>
            });
          }
    }


    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-6">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
            
            {dragonfliesJsx}
            
          </div>
          <div className="col-sm-4">
          </div>
          
        </div>

    );
  }
  
}




class Dragonfly extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var path = this.props.path;
    var dragonflyPath = path + "/" + this.props.dragonfly.dragonflyId;
    return (
        <div className="dragon-select-list-row dragon-pointer">
          <div className="dragon-select-list-cell">
            <i className='fa fa-address-book-o fa-fw fa-lg'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.dragonfly.contact.first}
            
            {this.props.dragonfly.contact.last}
            <br/>
            {this.props.dragonfly.contact.email}
          </div>
          <div className="dragon-select-list-cell">
            <i className='fa fa-graduation-cap fa-fw'></i> 
          </div>
          <div className="dragon-select-list-cell">
            {this.props.dragonfly.session.name}
          </div>
          <div className="dragon-select-list-cell">
            {dragonflyPath}
          </div>
        </div>
    );
  }


}


export default CampaignComponent;
