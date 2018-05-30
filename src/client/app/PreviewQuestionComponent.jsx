import React from 'react';
import { Link } from 'react-router';
import ResultsComponent from './ResultsComponent.jsx';


class PreviewQuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    var question = props.question;
    
    question.answers[0].isSelected = false;
    question.answers[1].isSelected = false;
    question.answers[2].isSelected = false;
    question.answers[3].isSelected = false;
    question.answers[4].isSelected = false;

    this.state = {
          question: question,
          isDisabled: false,
          button1Class: "btn btn-primary btn-lg",
          button2Class: "dragon-hidden",
          resultText: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
    this.handleAdvance = this.handleAdvance.bind(this);
  }
  



  render() {

    var question = this.state.question;
    var answers = question.answers;
    var totalWeight = this.props.totalWeight;
    var isDisabled = this.state.isDisabled;
    var handleUpdateAnswer = this.handleUpdateAnswer;
    
    var answersJsx = answers.map((answer, i) => {
        if (answer.isValid) {
          return <AnswerComponent i={i} handleUpdateAnswer={handleUpdateAnswer} answer={answer} isDisabled={isDisabled} />;
        }
    });
    
    var percentWeighting = question.weight / totalWeight;
    percentWeighting = Math.round(percentWeighting * 100, 2);
    
    return (

              
              <div className="jumbotron">
                      
                      <form ref='uploadForm' onSubmit={this.handleSubmit}>
                        <h2>{question.title}</h2>
                        
                        <br/>
                        
                        {answersJsx}
                        
                        <br/>
                        
                        <b>{this.state.resultText}</b>
                        
                        <br/>
                        <input type="submit" className={this.state.button1Class} value="Submit Answer" />
                        <div onClick={this.handleAdvance} className={this.state.button2Class}>Continue <i className='fa fa-chevron-circle-right'></i></div>
                        <br/><br/>
                        (correct answer worth ${percentWeighting})
                      </form>  
                      
              </div>

    );
  }


  handleUpdateAnswer(answer) {
    var question = this.state.question;
    var answers = question.answers;

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
    this.setState({isDisabled : "disabled"});
    this.setState({button1Class : "dragon-hidden"});
    this.setState({button2Class : "btn btn-primary btn-lg"});
    
    var question = this.state.question;
    var answers = question.answers;
    var totalWeight = this.props.totalWeight;
    
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
    
    this.setState({resultText : resultText});
    
    var percentWeighting = question.weight / totalWeight;
    percentWeighting = Math.round(percentWeighting * 100, 2);
    
    var value = percentWeighting;
    var earned = 0;
    if (correct) earned = percentWeighting;

    var result = {correct: correct, resultText: resultText, value:value, earned: earned};
    //dragonfly.results.push(result);
    //preview.earned = preview.earned + earned;
    //this.props.handleLoadPreview(preview);
  }
  
  
  
    
  handleAdvance(e) {
    this.setState({isDisabled : false});
    this.setState({button1Class : "btn btn-primary btn-lg"});
    this.setState({button2Class : "dragon-hidden"});
    this.setState({resultText : ""});

    
    
    var currentQuestion = this.state.currentQuestion;
    var breakpoint = this.state.breakpoint;
    var questions = breakpoint.questions;
    var question = this.state.question;
    
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
    question = questions[currentQuestion];
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
        
            <div className="dragon-select-list-form-cell-lg">
              <input type="checkbox" value={this.props.answer.isSelected} checked={this.props.answer.isSelected} disabled={this.props.isDisabled} />
            </div>
            <div className="dragon-select-list-form-cell-lg">
              {this.props.answer.letter}.
            </div>
            <div className="dragon-select-list-form-cell-lg">
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