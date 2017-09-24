import React from 'react';
import { Link } from 'react-router';
import StarsComponent from './StarsComponent.jsx';
import MillisecondsComponent from './MillisecondsComponent.jsx';


class BreakpointComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleStarsUpdate = this.handleStarsUpdate.bind(this);

  }

  render() {
    var handleLoadQuestion = this.props.handleLoadQuestion;
    var handleStarsUpdate = this.handleStarsUpdate;
    var breakpoint = this.props.breakpoint;
    var questions = breakpoint.questions;
    var history = this.props.history;
    
    var milliseconds = breakpoint.milliseconds;
    var thumbnailUrl = this.props.thumbnailUrl;
    
    var questionsJsx = function() {return '' }();
    if (questions == null){
      questionsJsx = function() {return 'No questions added to this breakpoint yet.' }();
    } else {
      questionsJsx = questions.map((question, i) => {
          if (question.weight == null) question.weight = 5;
          return <Question question={question} handleLoadQuestion={handleLoadQuestion} handleStarsUpdate={handleStarsUpdate} history={history}/>
      });
      
    }
    
    var millisecondsJsx = function() {return <MillisecondsComponent milliseconds={milliseconds} /> }();
    
    return (
        <div className="dragon-breakpoint">
          <div className="dragon-breakpoint-info">
            <img src={thumbnailUrl}/>
            <br/>
            {millisecondsJsx}
            <br/><br/>
          </div>
          <div className="dragon-breakpoint-questions">
            <div className="dragon-select-list">
              {questionsJsx}
            </div>
          
            <span onClick={this.handleSelectAddQuestion.bind(this, this.props.breakpoint)} className="dragon-link" ><i className='fa fa-plus-circle'></i> Add Question</span>
          </div>
        </div>
        
    );
  }
  
  handleSelectAddQuestion(breakpoint) {
    this.props.handleLoadBreakpoint(breakpoint);
    this.props.history.push('addquestion');
  }

  handleStarsUpdate(questionId, stars) {
    var myThis = this;
    var session = this.props.session;
    var sessionId = session.sessionId;
    var organizationId = this.props.organizationId;
    var breakpoints = this.props.session.breakpoints;
    
    for (var i = 0; i < breakpoints.length; i++) {
        if (breakpoints[i].questions != null) { 
                  for (var j = 0; j < breakpoints[i].questions.length; j++) {
                      if (breakpoints[i].questions[j].questionId === questionId) breakpoints[i].questions[j].weight = stars * 2;
                  }
        }
    }
    
    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set breakpoints = :breakpoints",
            ExpressionAttributeValues:{
                ":breakpoints":breakpoints
            },
            ReturnValues:"UPDATED_NEW"
        };


    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      session.breakpoints = breakpoints;
      myThis.props.handleLoadSession(session);
      myThis.props.history.push('session'); 
    });
    
    
    
    
  }

}




class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {weight : 10
    };
    this.handleStarsUpdate = this.handleStarsUpdate.bind(this);
  }
  

  render() {
    var handleStarsUpdate = this.handleStarsUpdate;
    var currentStars = this.props.question.weight / 2;
    var stars = function() {return <StarsComponent count={currentStars} handleStarsUpdate={handleStarsUpdate} /> }();
    
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
  
  
  handleStarsUpdate(stars) {
    var questionId = this.props.question.questionId;
    this.props.handleStarsUpdate(questionId, stars);
  }
  

}







export default BreakpointComponent;