import React from 'react';

class LoadDragonflyComponent extends React.Component {

  constructor(props) {
    super(props);
    
    this.getValidBreakpoints = this.getValidBreakpoints.bind(this);
    this.getOrderedBreakpoints = this.getOrderedBreakpoints.bind(this);
    this.handleValidateQuestion = this.handleValidateQuestion.bind(this);
    this.compareMilliseconds = this.compareMilliseconds.bind(this);
    
  }
  
  componentDidMount() {
    var myThis = this;
    var dragonflyId = this.props.dragonflyId;
    
    var params = {
        TableName : "Dragonflies",
        KeyConditionExpression: "#dragonflyId = :dragonflyId",
        ExpressionAttributeNames:{
            "#dragonflyId": "dragonflyId"
        },
        ExpressionAttributeValues: {
            ":dragonflyId":dragonflyId
        }
    };

    this.props.dbQueryUnauth(params, function(result) {
      var dragonfly = result.Items[0];
      var session = dragonfly.session;
      var validBreakpoints = myThis.getValidBreakpoints(session.breakpoints);
      var orderedBreakpoints = myThis.getOrderedBreakpoints(validBreakpoints);
      session.breakpoints = orderedBreakpoints;
      dragonfly.session = session;
      myThis.props.handleLoadDragonfly(dragonfly);
      myThis.props.history.push('play');    
      
    });
    
    
  }
  

  render() {
    
    return (

      <div className="row">
        <div className="col-sm-3">
          
        </div>
        <div className="col-sm-6">
              <i className='fa fa-circle-o-notch fa-spin'></i> Loading Dragonfly
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      
    );
  }
  

  
  getValidBreakpoints(breakpoints) {
    
    var validBreakpoints = [];
    var validBreakpoint = {};
    var validQuestions = [];
    var isValidQuestion = false;
    var totalWeight = 0;
    
    for (var i = 0; i < breakpoints.length; i++) {
      var breakpoint = breakpoints[i];
      var questions = breakpoint.questions;

      
      // first, create a brand new breakpoint that just has the milliseconds property
      validBreakpoint = {};
      validBreakpoint.milliseconds = breakpoint.milliseconds;

      
      // next, go through the questions and only add in valid questions
      validQuestions = [];
      totalWeight = 0;

      if (questions != null) {
            for (var j = 0; j < questions.length; j++) {
                  var question = questions[j];
                  isValidQuestion = this.handleValidateQuestion(question);
                  
                  
                  if (isValidQuestion) {
                    validQuestions.push(question);
                    totalWeight = totalWeight + questions[j].weight;
                  }
            }
      }

      
      // third, for breakpoints with valid questions, add those breakpoints in
      if (validQuestions.length != 0) {
            validBreakpoint.questions = validQuestions;
            validBreakpoint.totalWeight = totalWeight;
            validBreakpoints.push(validBreakpoint);
      }




    }
    return validBreakpoints;
  }
  
  
  
  getOrderedBreakpoints(breakpoints) {
    var orderedBreakpoints = breakpoints.sort(this.compareMilliseconds);
    return orderedBreakpoints;
  }
  
  
  compareMilliseconds(a,b) {
    if (a.milliseconds < b.milliseconds)
      return -1;
    if (a.milliseconds > b.milliseconds)
      return 1;
    return 0;
  }


  
  
  handleValidateQuestion(question) {
    var isValidQuestion = true;
    
    
    return isValidQuestion;
  }
  



}

export default LoadDragonflyComponent;