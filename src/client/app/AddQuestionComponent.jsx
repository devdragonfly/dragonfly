import React from 'react';
import {Link} from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';


const buttonClassName = "btn btn-primary";

class AddQuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {titleValue : '',
                  answers : ['A', 'B', 'C', 'D', 'E'],
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden",
                  errorMessage : ''
    };
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTitleValue = this.updateTitleValue.bind(this);
    this.handleLoadAnswer = this.handleLoadAnswer.bind(this);

  }
  
  handleLoadAnswer(i, letter, text, isCorrect, isValid) {
    var answer = { letter : letter, text : text, isCorrect : isCorrect, isValid : isValid};
    var answers = this.state.answers;
    answers[i] = answer;
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

    var lettersArray = ['A', 'B', 'C', 'D', 'E'];
    var handleLoadAnswer = this.handleLoadAnswer;
    var answersJsx = lettersArray.map((letter, i) => {
                return <Answer i={i} letter={letter} handleLoadAnswer={handleLoadAnswer} />
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
            
              <div className="dragon-select-list">
                {answersJsx}
              </div>
            
              <input type="submit" className={this.state.buttonRestClassName} value="Add Question" />
              <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Adding Question</div>
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
    
    var answers = this.state.answers;
    var myThis = this;
    
    var validAnswers = [];
    
    var correctAnswerCount = 0;
    
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].isValid) {
          validAnswers.push({letter: answers[i].letter, text: answers[i].text, isCorrect: answers[i].isCorrect});
          
          if(answers[i].isCorrect) { correctAnswerCount = correctAnswerCount + 1; }
          
          
        }
    }
    

    
    this.setState({errorMessage: ''});
    
    
    if (title === '') {
      this.setState({errorMessage: "Please enter a title for your question."});
      myThis.showClickedButtonState(false);
      return;
    }
    
    if (validAnswers.length < 2) {
      this.setState({errorMessage: "Please enter at least 2 valid answers."});
      myThis.showClickedButtonState(false);
      return;
    }
    
    if (correctAnswerCount === 0) {
      this.setState({errorMessage: "Please select at least 1 correct answer."});
      myThis.showClickedButtonState(false);
      return;
    }


    var question = { title : title, answers : validAnswers };
    var questions = [];
    
    if (this.props.session.questions != null) {
      questions = this.props.session.questions;
    }
    
    questions.push(question);

   
    var params = {
            TableName:"Sessions",
            Key: {
                organizationId : organizationId,
                sessionId : sessionId
            },
            UpdateExpression: "set questions = :questions",
            ExpressionAttributeValues:{
                ":questions":questions
            },
            ReturnValues:"UPDATED_NEW"
        };
    
    

    this.props.dbUpdate(params, function(result) {
      myThis.showClickedButtonState(false);
      myThis.props.handleLoadQuestions(result.Attributes.questions);
      myThis.props.history.push('session');    
      
    });
    
    
    
  }

}





class Answer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text : '', isCorrect : false, isValid : false};
    this.updateTextValue = this.updateTextValue.bind(this);
    this.updateIsCorrectValue = this.updateIsCorrectValue.bind(this);
  }

  render() {
    
    
    
    return (
        <div className="dragon-select-list-row">
            <div className="dragon-select-list-form-cell">
              {this.props.letter}.
            </div>
            <div className="dragon-select-list-form-cell">
              <input value={this.state.text} onChange={this.updateTextValue} className="form-control" placeholder="answer"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input type="checkbox" onChange={this.updateIsCorrectValue} value={this.state.IsCorrect} /> Correct
            </div>
            
            
        </div>
    );
  }
  
  updateTextValue(e) {
    var myThis = this;
    var text = e.target.value;
    this.setState({
      text: text
    });

    var isValid = false;
    if (text.length > 0) { isValid = true }
    

    this.setState({
      isValid: isValid
    });
    
    this.props.handleLoadAnswer(myThis.props.i, myThis.props.letter, text, myThis.state.isCorrect, isValid);
  } 
  
  
  updateIsCorrectValue(e) {
    var myThis = this;
    var isCorrect = this.state.isCorrect;
    isCorrect = !isCorrect;
    this.setState({
      isCorrect: isCorrect
    });
    
    this.props.handleLoadAnswer(myThis.props.i, myThis.props.letter, myThis.state.text, isCorrect, myThis.state.isValid);
    
  } 


}




export default AddQuestionComponent;