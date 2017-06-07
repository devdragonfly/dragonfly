import React from 'react';
import { Link } from 'react-router';
import OrganizationMenuComponent from './OrganizationMenuComponent.jsx';
import StarsComponent from './StarsComponent.jsx';



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
    this.state = {weight : 10
    };
    this.updateWeight = this.updateWeight.bind(this);
  }
  

  render() {
    
    var stars = function() {return <StarsComponent count="3.5" /> }();
    
    return (
        <div className="dragon-select-list-row">
          <div className="dragon-select-list-cell">
            <i className='fa fa-sort fa-fw fa-lg'></i>
          </div>
          <div className="dragon-select-list-cell" >
            {this.props.question.title}&nbsp;
            <i className='fa fa-pencil fa-fw dragon-pointer' onClick={this.handleSelectQuestion.bind(this, this.props.question)}></i>
          </div>
          <div className="dragon-select-list-cell" onClick={this.handleSelectQuestion.bind(this, this.props.question)}>
            <i className='fa fa-pause fa-fw dragon-pointer'></i>&nbsp;
            00.00s
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
  
  
  updateWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }
  

}







export default SessionComponent;