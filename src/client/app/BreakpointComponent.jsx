import React from 'react';
import { Link } from 'react-router';
import StarsComponent from './StarsComponent.jsx';
import MillisecondsComponent from './MillisecondsComponent.jsx';


class BreakpointComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    var handleLoadQuestion = this.props.handleLoadQuestion;
    var breakpoint = this.props.breakpoint;
    var questions = breakpoint.questions;
    var milliseconds = breakpoint.milliseconds;
    var history = this.props.history;
    
    var questionsJsx = function() {return '' }();
    if (questions == null){
      questionsJsx = function() {return 'No questions added to this breakpoint yet.' }();
    } else {
      questionsJsx = questions.map((question, i) => {
          return <Question question={question} handleLoadQuestion={handleLoadQuestion} history={history}/>
      });
      
    }
    
    var millisecondsJsx = function() {return <MillisecondsComponent milliseconds={milliseconds} /> }();
    
    return (
        <div className="dragon-breakpoint">
          <div className="dragon-breakpoint-info">
            <img src="./images/video-play.jpg"/>
            <br/>
            {millisecondsJsx}
            <br/><br/>
          </div>
          <div className="dragon-breakpoint-questions">
            <div className="dragon-select-list">
              {questionsJsx}
            </div>
          
            <span onClick={this.handleSelectAddQuestion.bind(this, this.props.breakpoint)} ><i className='fa fa-plus-circle'></i> Add Question</span>
          </div>
        </div>
        
    );
  }
  
  handleSelectAddQuestion(breakpoint) {
    alert(1);
    this.props.handleLoadBreakpoint(breakpoint);
    alert(2);
    this.props.history.push('addquestion');
  }


}




class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {weight : 10
    };
    this.updateWeight = this.updateWeight.bind(this);
  }
  

  render() {
    
    var stars = function() {return <StarsComponent count="3.5" /> }();
    
    return (
        <div className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-sort fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell dragon-question-cell" onClick={this.handleSelectQuestion.bind(this, this.props.question)}>
            {this.props.question.title}&nbsp;
            <i className='fa fa-pencil fa-fw'></i>
          </div>
          <div className="dragon-select-list-cell">
            {stars}
          </div>
        </div>
    );
  }
  
  handleSelectQuestion(question) {
    this.props.handleLoadQuestion(question);
    this.props.history.push('editquestion');
  }
  
  
  updateWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }
  

}







export default BreakpointComponent;