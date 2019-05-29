import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import AnswerComponent from './AnswerComponent.jsx';

const buttonClassName = "btn btn-primary";

class AddQuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    var answers = [
      {letter: 'A', text: '', isCorrect: false, isValid: false},
      {letter: 'B', text: '', isCorrect: false, isValid: false},
      {letter: 'C', text: '', isCorrect: false, isValid: false},
      {letter: 'D', text: '', isCorrect: false, isValid: false},
      {letter: 'E', text: '', isCorrect: false, isValid: false},
      ];
    this.state = {titleValue : '',
                  isSurvey : false,
                  answers : answers,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden",
                  errorMessage : '',
                  questionType: {
                    multipleChoice: true,
                    openEnded: false,
                    survey: false
                  }
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitleValue = this.updateTitleValue.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
    this.handleSurveyOption = this.handleSurveyOption.bind(this);

  }

  handleUpdateAnswer(answer) {
    var answers = this.state.answers;
    var isValid = false;
    if ((answer.text != null) && (answer.text != "")) {
      isValid = true;
    }
    answer.isValid = isValid;
    for (var i = 0; i < 5; i++) {
        if (answers[i].letter === answer.letter) {
          answers[i] = answer;
        }
    }

    this.setState({
      answers: answers
    });

  }

  componentWillMount() {
    var sessions = this.props.sessions;
    if (sessions === 'not found') {
      this.props.history.push('loadsessions');
    }
  }

  render() {
    var answers = this.state.answers;
    var handleUpdateAnswer = this.handleUpdateAnswer;
    var isSurvey = this.state.isSurvey;
    var answersJsx = answers.map((answer, i) => {
        return <AnswerComponent i={i} handleUpdateAnswer={handleUpdateAnswer} answer={answer} isSurvey={isSurvey}/>
    });


    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();

    return (

        <div className="row">
          {organizationMenu}
          <div className="col-sm-6">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>

            <br/><br/>

            <form onSubmit={this.handleSubmit}>

              <input value={this.state.titleValue} onChange={this.updateTitleValue} className="form-control" placeholder="question title"/>

              <br/>

              <div className='select-question-type__container'>
                <input value='multiple-choice' id='1' name='multipleChoice' type='radio' checked={this.state.questionType.multipleChoice} onChange={this.handleTypeSelect}/>
                <label for='1'>Multiple Choice</label>
                <input value='open-ended' id='2' name='openEnded' type='radio' checked={this.state.questionType.openEnded} onChange={this.handleTypeSelect}/>
                <label for='2'>Open-Ended</label>
                <input value='survey' id='3' name='survey' type='radio' checked={this.state.questionType.survey} onChange={this.handleTypeSelect}/>
                <label for='3'>Survey</label>
              </div>

              <div className="dragon-select-list-form-cell">
                <input type="checkbox" onChange={this.handleSurveyOption} value={this.state.isSurveyQuestion} checked={this.state.isSurveyQuestion} /> Any answer is correct
              </div>

              <br/>

              <div className="dragon-select-list">
                {answersJsx}
              </div>

              <br/><br/>

              <input type="submit" className={this.state.buttonRestClassName} value="Add Question" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Question</div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={`session`}>Cancel</Link>


            </form>
            <span className="dragon-error">{this.state.errorMessage}</span>

          </div>
          <div className="col-sm-4">
          </div>
        </div>
    );
  }



  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
    }
  }


  updateTitleValue(e) {
    this.setState({
      titleValue: e.target.value
    });
  }

  handleSurveyOption(e) {
    this.setState({
      isSurvey: e.target.checked
    });
  }

  handleTypeSelect(e) {
    var newType = {
      questionType: {
        multipleChoice: false,
        openEnded: false,
        survey: false
      }
    }

    if (e.target.name == 'survey') {
      newType.questionType.survey = true;
    } else if (e.target.name == 'openEnded') {
      newType.questionType.openEnded = true;
    } else {
      newType.questionType.multipleChoice = true;
    }

    setState(newType);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);

    const title = this.state.titleValue;
    const organizationId = this.props.organizationId;
    const sessionId = this.props.session.sessionId;

    const isSurveyQuestion = this.state.isSurvey;
    // const questionType = this.state.questionType;

    var answers = this.state.answers;

    var myThis = this;

    var validAnswersCount = 0;
    var correctAnswerCount = 0;

    for (var i = 0; i < answers.length; i++) {
        if (answers[i].isValid) {
          validAnswersCount = validAnswersCount + 1;
          if(answers[i].isCorrect) { correctAnswerCount = correctAnswerCount + 1; }
        } else {
          delete answers[i].text;
        }
    }



    this.setState({errorMessage: ''});


    if (title === '') {
      this.setState({errorMessage: "Please enter a title for your question."});
      myThis.showClickedButtonState(false);
      return;
    }

    if (validAnswersCount < 2) {
      this.setState({errorMessage: "Please enter at least 2 valid answers."});
      myThis.showClickedButtonState(false);
      return;
    }

    if (correctAnswerCount === 0) {
      this.setState({errorMessage: "Please select at least 1 correct answer."});
      myThis.showClickedButtonState(false);
      return;
    }

    var questionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    var session = this.props.session;
    var breakpoints = this.props.session.breakpoints;
    var breakpointId = this.props.breakpoint.breakpointId;

    var breakpointPosition = 0;
    for (var i = 0; i < breakpoints.length; i++) {
      if (breakpoints[i].breakpointId === breakpointId) breakpointPosition = i;
    }


    var question = { questionId: questionId, title : title, answers : answers, isSurvey: isSurveyQuestion };

    if (breakpoints[breakpointPosition].questions != null) {
      breakpoints[breakpointPosition].questions.push(question);
    } else {
      breakpoints[breakpointPosition].questions = [];
      breakpoints[breakpointPosition].questions.push(question);
    }



    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set breakpoints = :breakpoints",
            ExpressionAttributeValues:{
                ":breakpoints" : breakpoints
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



export default AddQuestionComponent;
