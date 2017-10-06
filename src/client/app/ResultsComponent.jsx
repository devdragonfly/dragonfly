import React from 'react';



class ResultsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var results = this.props.results;
    
    var resultsJsx = results.map((result, i) => {
        return <ResultComponent i={i} result={result} />;
    });
    
    return (

          <div>
            <br/><br/><br/>
            
            <h4>Results</h4>
            
            {resultsJsx}
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
        <div className="dragon-select-list">
            <div className="dragon-select-list-cell">
              Question &nbsp;
              {this.props.i + 1}:&nbsp;
              <i className={iconClass}></i>
              &nbsp;&nbsp;
              {this.props.result.resultText}
            </div>
            <div className="dragon-select-list-cell">
              Earned: ${this.props.result.earned} out of ${this.props.result.value}
            </div>
        </div>
    );
  }


}






export default ResultsComponent;