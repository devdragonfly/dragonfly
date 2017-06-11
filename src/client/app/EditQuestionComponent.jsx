import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import AnswerComponent from './AnswerComponent.jsx';

const buttonClassName = "btn btn-primary";

class EditQuestionComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {titleValue : props.question.title,
                  answers : props.question.answers,
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden",
                  errorMessage : ''
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitleValue = this.updateTitleValue.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);

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
    var answersJsx = answers.map((answer, i) => {
        return <AnswerComponent i={i} handleUpdateAnswer={handleUpdateAnswer} answer={answer} />
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
            
              <br/><br/>
            
              <div className="dragon-select-list">
                {answersJsx}
              </div>
              
              <br/><br/>
            
              <input type="submit" className={this.state.buttonRestClassName} value="Save" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Saving</div>
              
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


  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    
    const title = this.state.titleValue;
    const organizationId = this.props.organizationId;
    const sessionId = this.props.session.sessionId;
    const questionId = this.props.question.questionId;
    
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


    var question = { questionId:questionId, title : title, answers : answers };

    var session = this.props.session;
    var breakpoints = this.props.session.breakpoints;
    
    for (var i = 0; i < breakpoints.length; i++) {
        if (breakpoints[i].questions != null) { 
                  for (var j = 0; j < breakpoints[i].questions.length; j++) {
                      if (breakpoints[i].questions[j].questionId === questionId) breakpoints[i].questions[j] = question;
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



export default EditQuestionComponent;