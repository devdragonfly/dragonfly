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
            ":dragonflyId": dragonflyId
        }
    };

    this.props.dbQueryUnauth(params, function(result) {

      var dragonfly = result.Items[0];

      // if earned is already populated, it's because this dragonfly was already completed
      // and we need to redirect to completion page
      if (dragonfly.earned != null) {
        dragonfly.previousCompletion = true;
        myThis.props.handleLoadDragonfly(dragonfly);
        myThis.props.history.push('dragonflycomplete');
        return;
      }

      var session = dragonfly.session;
      //
      // #Error here because breackpoint are not defined here(session).breakpoints and later .length called on undefined
      //
      var sessionValidBreakpoints = myThis.getValidBreakpoints(session.breakpoints);
      var orderedBreakpoints = myThis.getOrderedBreakpoints(sessionValidBreakpoints.breakpoints);
      session.breakpoints = orderedBreakpoints;
      session.totalWeight = sessionValidBreakpoints.totalWeight;
      session.totalQuestionCount = sessionValidBreakpoints.totalQuestionCount;
      dragonfly.session = session;
      myThis.props.handleLoadDragonfly(dragonfly);
      // myThis.props.history.push('dragonflystart');

      if (myThis.props.campaigns === 'not found') {
        var organizationId = dragonfly.organizationId;
        var params = {
            TableName : "Campaigns",
            KeyConditionExpression: "#organizationId = :organizationId",
            ExpressionAttributeNames:{
                "#organizationId": "organizationId"
            },
            ExpressionAttributeValues: {
                ":organizationId":organizationId
            }
        };

        myThis.props.dbQueryUnauth(params, function(result) {
          myThis.props.handleLoadCampaigns(result);
          myThis.props.history.push('dragonflystart');
        });
      } else {
        myThis.props.history.push('dragonflystart');
      }
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
    var sessionValidBreakpoints = {};
    var validBreakpoints = [];
    var validBreakpoint = {};
    var validQuestions = [];
    var isValidQuestion = false;
    var totalWeight = 0;
    var totalQuestionCount = 0;

    for (var i = 0; i < breakpoints.length; i++) {
      var breakpoint = breakpoints[i];
      var questions = breakpoint.questions;


      // first, create a brand new breakpoint that just has the milliseconds property
      validBreakpoint = {};
      validBreakpoint.milliseconds = breakpoint.milliseconds;


      // next, go through the questions and only add in valid questions
      validQuestions = [];

      if (questions != null) {
            for (var j = 0; j < questions.length; j++) {
                  var question = questions[j];

                  question.answers[0].isSelected = false;
                  question.answers[1].isSelected = false;
                  question.answers[2].isSelected = false;
                  question.answers[3].isSelected = false;
                  question.answers[4].isSelected = false;

                  isValidQuestion = this.handleValidateQuestion(question);


                  if (isValidQuestion) {
                    if (questions[j].weight === undefined) { questions[j].weight = 2.5; }
                    validQuestions.push(question);

                    totalWeight = totalWeight + questions[j].weight;
                    totalQuestionCount = totalQuestionCount + 1;
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

    sessionValidBreakpoints.breakpoints = validBreakpoints;
    sessionValidBreakpoints.totalWeight = totalWeight;
    sessionValidBreakpoints.totalQuestionCount = totalQuestionCount;

    return sessionValidBreakpoints;
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
