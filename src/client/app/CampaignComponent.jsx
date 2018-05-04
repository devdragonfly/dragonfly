import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


class CampaignComponent extends React.Component {

  constructor(props) {
    super(props);
    
    

    
    this.state = {path : "not found",
                  totals: []
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
    
    var data = [];
    var dragonflies = this.props.results.Items;
    for (var i = 0; i < dragonflies.length; i++) {
      if (dragonflies[i].results != null) {
        data.push(dragonflies[i].results);
      }
    }
    
    var totals = [];
    if (data.length > 0) {
      totals = Array.apply(null, Array(data[0].length)).map(Number.prototype.valueOf,0);
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[0].length; j++) {
          if (data[i][j].correct) totals[j] = totals[j] + 1;
        }        
      }
      
    }
    
    
    this.setState({totals : totals});
    
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

          <div className="col-sm-10">
            <h3><i className='fa fa-line-chart fa-fw'></i> {this.props.campaign.name}</h3>
            <br/><br/>
            
            {dragonfliesJsx}
            
            <br/><br/>
            
            {JSON.stringify(this.state.totals)}
            
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
    var dragonflyPath = path + "/#/view?id=" + this.props.dragonfly.dragonflyId;
    var status = "not opened";
    if (this.props.dragonfly.results != null) {status = "completed"}
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
          <div className="dragon-select-list-cell">
            {this.props.dragonfly.reward}
          </div>
          <div className="dragon-select-list-cell">
            {status}
          </div>
        </div>
    );
  }


}


export default CampaignComponent;
