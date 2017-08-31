import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';



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

    this.state = {
          currentQuestion: 0,
          breakpoint: breakpoint,
          question: question
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }




  render() {
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    var question = this.state.question;
    var answersJsx = question.answers.map((answer, i) => {
        return <AnswerComponent i={i} answer={answer} />
    });
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
            <br/>
            PREVIEW SESSION:
            <br/>
            
            <form ref='uploadForm' onSubmit={this.handleSubmit}>
            
              <br/><br/>
              <h2>{question.title}</h2>
              
              <br/>
              
              {answersJsx}
              
              <br/>
              
              <input type="submit" className="btn btn-primary" value="Continue" />
            </form>  
          </div> 
          <div className="col-sm-6">
          </div>
        </div>

    );
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    var myThis = this;
    var currentQuestion = this.state.currentQuestion;
    var breakpoint = this.state.breakpoint;
    var questions = breakpoint.questions;
    
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
    this.setState({
      currentQuestion:currentQuestion, question:question
    });
 
  }
  
}















class AnswerComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    
    return (
        <div>
          {this.props.answer.text}
        </div>
    );
  }

}
















export default PreviewQuestionComponent;