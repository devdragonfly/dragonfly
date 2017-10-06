import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import ResultsComponent from './ResultsComponent.jsx';


class PreviewQuestionComponent extends React.Component {

  constructor(props) {
    super(props);

    
    var preview = props.preview;
    var breakpoint = preview.breakpoint;
    var questions = breakpoint.questions;
    
    var question = {title:"No questions added to this breakpoint.", answers:[]};
    if (questions != null) {
      question = questions[0];
    } 
    
    question.answers[0].isSelected = false;
    question.answers[1].isSelected = false;
    question.answers[2].isSelected = false;
    question.answers[3].isSelected = false;
    question.answers[4].isSelected = false;

    this.state = {
          currentQuestion: 0,
          breakpoint: breakpoint,
          question: question,
          answers: question.answers
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
  }




  render() {
    var results = this.props.preview.results;
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    var resultsComponent = function() {return <ResultsComponent results={results} /> }();
    
    var question = this.state.question;
    var answers = this.state.answers;
    var handleUpdateAnswer = this.handleUpdateAnswer;
    
    var answersJsx = answers.map((answer, i) => {
        if (answer.isValid) {
          return <AnswerComponent i={i} handleUpdateAnswer={handleUpdateAnswer} answer={answer} />;
        }
    });
    
    var percentWeighting = question.weight / this.props.preview.totalWeight;
    percentWeighting = Math.round(percentWeighting * 100, 2);
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-5">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name} (preview)</h3>
            <br/>
            
            <form ref='uploadForm' onSubmit={this.handleSubmit}>
            
              <br/><br/>
              <h4>{question.title}</h4>
              
              <br/>
              
              {answersJsx}
              
              <br/>
              
              <input type="submit" className="btn btn-primary" value="Continue" />
              
              <br/><br/>
              (correct answer worth ${percentWeighting})
            </form>  
          </div> 
          <div className="col-sm-5">
            {resultsComponent}
          </div>
        </div>

    );
  }


  handleUpdateAnswer(answer) {
    var answers = this.state.answers;

    for (var i = 0; i < 5; i++) {
        if (answers[i].letter === answer.letter) {
          answers[i] = answer;
        }
    }
    this.setState({
      answers: answers
    });  
    
    
  }
  
  handleSubmit(e) {
    e.preventDefault();
    var myThis = this;
    var currentQuestion = this.state.currentQuestion;
    var breakpoint = this.state.breakpoint;
    var question = this.state.question;
    var questions = breakpoint.questions;
    var answers = this.state.answers;
    var preview = this.props.preview;
    
    var correct = true;
    var correctAnswers = "";
    //check if answer is correct
    for (var i = 0; i < 5; i++) {
        if (answers[i].isCorrect) {
          correctAnswers = correctAnswers + answers[i].letter;
        }
        if (answers[i].isCorrect && !answers[i].isSelected) {
          correct = false;
        }
        if (!answers[i].isCorrect && answers[i].isSelected) {
          correct = false;
        }
    }
    
    correctAnswers =  correctAnswers.split("").join(" and ");
    
    var resultText = correctAnswers + " was correct!";
    if (correct) {
      if (correctAnswers.length > 1) { resultText = correctAnswers + " were correct!"; } 
    } else {
      resultText = "Sorry, the correct answer was " + correctAnswers + ".";
      if (correctAnswers.length > 1) { resultText = "Sorry, the correct answers were " + correctAnswers + "."; } 
    }
    
    var percentWeighting = question.weight / preview.totalWeight;
    percentWeighting = Math.round(percentWeighting * 100, 2);
    
    var value = percentWeighting;
    var earned = 0;
    if (correct) earned = percentWeighting;

    var result = {correct: correct, resultText: resultText, value:value, earned: earned};
    preview.results.push(result);
    this.props.handleLoadPreview(preview);
    
    
    // if there were no questions in the first place, go back to video
    if (questions == null) {
      this.props.history.push('preview');
    }
    
    currentQuestion = currentQuestion + 1;
    
    // check if lasts question, and go to next video clip
    if (currentQuestion === questions.length) {
      this.props.history.push('preview');
    }
    
    // if not last question, advance question and remain here
    var question = questions[currentQuestion];
    question.answers[0].isSelected = false;
    question.answers[1].isSelected = false;
    question.answers[2].isSelected = false;
    question.answers[3].isSelected = false;
    question.answers[4].isSelected = false;
    
    
    this.setState({
      currentQuestion:currentQuestion, 
      question:question,
      answers: question.answers
    });
 
  }
  
}















class AnswerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.updateSelectAnswer = this.updateSelectAnswer.bind(this);
  }

  render() {

    
    return (
        <div className="dragon-select-list-row" onClick={this.updateSelectAnswer}>
        
            <div className="dragon-select-list-form-cell">
              <input type="checkbox" value={this.props.answer.isSelected} checked={this.props.answer.isSelected} />
            </div>
            <div className="dragon-select-list-form-cell">
              {this.props.answer.letter}.
            </div>
            <div className="dragon-select-list-form-cell">
              {this.props.answer.text}
            </div>
        </div>
    );
  }



  updateSelectAnswer(e) {
    var answer = this.props.answer;
    var isSelected = answer.isSelected;
    answer.isSelected = !isSelected;
    this.props.handleUpdateAnswer(answer);
    
  } 



}
















export default PreviewQuestionComponent;