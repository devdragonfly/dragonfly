import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';




class SessionComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
   var handleLoadQuestion = this.props.handleLoadQuestion;
    var questions = this.props.session.questions;
    var history = this.props.history;
    
    var questionsJsx = function() {return '' }();
    var answerCount = 0;
    if (questions == null){
      questionsJsx = function() {return 'No questions added to this session yet.' }();
    } else {
      questionsJsx = questions.map((question, i) => {
          answerCount = question.answers.length;
          return <Question question={question} answerCount={answerCount} handleLoadQuestion={handleLoadQuestion} history={history}/>
      });
      
    }
    
    var organizationMenu = function() {return <OrganizationMenuComponent current="sessions" /> }();
    
    
    return (

        <div className="row">
          {organizationMenu}

          <div className="col-sm-10">
            <h3><i className='fa fa-file-video-o fa-fw'></i> {this.props.session.name}</h3>
            
            
            <img src="./images/video-play.jpg"/>
            
            <div className="dragon-select-list">
              {questionsJsx}
            </div>
            
            
            <Link to={`addquestion`} className="btn btn-primary"><i className='fa fa-plus'></i> Add Question</Link>
          </div>
          
        </div>



    );
  }


}




class Question extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div onClick={this.handleSelectQuestion.bind(this, this.props.question)} className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-question-circle fa-fw'></i>
          </div>
          <div className="dragon-select-list-cell">
            {this.props.question.title}
          </div>
          <div className="dragon-select-list-cell">
            <span className="label label-primary"><i className='fa fa-caret-square-o-up fa-fw'></i> insert breakpoint</span>
            
          </div>
        </div>
    );
  }
  
  handleSelectQuestion(question) {
    this.props.handleLoadQuestion(question);
    this.props.history.push('editquestion');
  }

}







export default SessionComponent;