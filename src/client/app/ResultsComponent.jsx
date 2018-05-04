import React from 'react';



class ResultsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {menuClass: "dragon-hidden"};
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

  }
  
  
  

  
  mouseOver() {
      this.setState({menuClass: "dragon-menu-visible-wide dragon-menu-right"});
      
  }

  mouseOut() {
      this.setState({menuClass: "dragon-hidden"});
  }

  render() {
    var earned = Number(this.props.earned).toFixed(2);
    var results = this.props.results;
    
    var resultsJsx = results.map((result, i) => {
        return <ResultComponent i={i} result={result} />;
    });
    
    return (
          
          <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="dragon-results-menu pull-right">
            <span className="dragon-earned">${earned} &nbsp;<i className="fa fa-chevron-circle-down"></i></span>
            <div className={this.state.menuClass}>
                {resultsJsx}
            </div>
          </div>

    );
  }


}










class ResultComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var iconClass = "fa fa-times-circle fa-fw dragonfly-red";
    if (this.props.result.correct) iconClass = "fa fa-check fa-fw dragonfly-green";
    return (
        <div>
              Question &nbsp;
              {this.props.i + 1}:&nbsp;
              <i className={iconClass}></i>
              &nbsp;&nbsp;
              {this.props.result.resultText}
              &nbsp;&nbsp;
              Earned: ${this.props.result.earned} out of ${this.props.result.value}
        </div>
    );
  }


}






export default ResultsComponent;