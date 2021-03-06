import React from 'react';
import { Link } from 'react-router';
import ResultsComponent from './ResultsComponent.jsx';
import LogoComponent from './components/LogoComponent.jsx';

var firstTime = true;
var myInterval = null;

class DragonflyPlayComponent extends React.Component {



  constructor(props) {
    super(props);

    var breakpoints = props.session.breakpoints;
    var nextPause = breakpoints[0].milliseconds;

    this.state = {
          breakpointNumber: 0,
          questionNumber: 0,
          currentTime: 0,
          nextPause: nextPause,
          results: [],
          earned: 0,
          question: null,
          resultText: null,
          submitButtonClassname: "btn btn-primary",
          showModal : false,
          modalClassName : 0,
          videoIsEnded : false,
          breakpointsAreComplete : false,
          videoClassname: "dragon-video-show"
    };

    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
    this.advanceBreakpoint = this.advanceBreakpoint.bind(this);
    this.advanceQuestion = this.advanceQuestion.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleDragonflyComplete = this.handleDragonflyComplete.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);


  }

  componentDidMount() {
    var myThis = this;
    var dragonfly = this.props.dragonfly;

    mixpanel.track('Session Started', {
      'DragonflyId': dragonfly.dragonflyId,
      'CampaignId': dragonfly.campaignId,
      'FirstName': dragonfly.contact.first,
      'LastName': dragonfly.contact.last,
      'Email': dragonfly.contact.email,
      'Incentive': dragonfly.incentive,
      'CheckboxManualDemo': dragonfly.checkbox
    });

    var video = document.getElementById("my-player");
    video.play();

    video.onplay = function() {
      if (firstTime) {
        myInterval = setInterval(function(){
            myThis.handleInterval(video);
        }.bind(this), 25);
      }
      firstTime = false;
    };

    video.onended = function() {
      myThis.setState({videoIsEnded : true});
      var breakpointsAreComplete = myThis.state.breakpointsAreComplete;
      if (!breakpointsAreComplete) {
        myThis.showQuestion();
      }
    };

    if (typeof window !== 'undefined') {
      var path = window.location.protocol + '//' + window.location.host;
      this.setState({path : path});
    } else {
      // work out what you want to do server-side...
    }
  }



  render() {
    var results = this.state.results;
    var earned = this.state.earned;

    var resultsComponent = function() {return <ResultsComponent results={results} earned={earned} /> }();

    var question = this.state.question;
    var handleSubmitAnswer = this.submitAnswer;
    var isDisabled = this.state.isDisabled;
    var resultText = this.state.resultText;
    var submitButtonClassname = this.state.submitButtonClassname;
    var modalClassName = this.state.modalClassName;
    var modalComponent = function() {return <ModalComponent question={question} modalClassName={modalClassName} handleSubmitAnswer={handleSubmitAnswer} isDisabled={isDisabled} resultText={resultText} submitButtonClassname={submitButtonClassname} /> }();

    var videoId = this.props.session.video.videoId;
    var videoUrl = "https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/" + videoId + "/mp4-" + videoId + ".mp4";

    var thumbnailUrl = "./images/play.png";
    var dragonfly = this.props.dragonfly;

    return (
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          {resultsComponent}
          <br/><br/>
          <div className="jumbotron dragon-enlarge bg-white">
            <div className="clearfix">
              <a href={this.state.path} target="_blank">
                <div className="dragon-powered-by divLeft">
                  <LogoComponent dragonfly={dragonfly} />
                </div>
              </a>
            </div>
            <div className="padding-18-vertical">
              <video autoplay
                  className={this.state.videoClassname}
                  id="my-player"
                  preload="auto"
                  poster={thumbnailUrl}
                  data-setup='{}'
                  onClick={this.handleClickPlay}>
                <source src={videoUrl} type="video/mp4"></source>
                <p className="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a
                  web browser that
                  <a href="http://videojs.com/html5-video-support/" target="_blank">
                    supports HTML5 video
                  </a>
                </p>
              </video>
            </div>
           </div>
            {modalComponent}
        </div>
        <div className="col-sm-2"></div>
      </div>
    );
  }


  handleClickPlay(e) {
    var video = e.target;
    video.play();
  }

  handleInterval(video) {
    var breakpointsAreComplete = this.state.breakpointsAreComplete;
    var videoIsEnded = this.state.videoIsEnded;
    if (breakpointsAreComplete && videoIsEnded) {
      this.handleDragonflyComplete();
    }


    var showModal = this.state.showModal;
    var modalClassName = this.state.modalClassName;

    if((showModal) && (modalClassName < 35)) {
      //alert("adding " + modalClassName);
      modalClassName = modalClassName + 1;
      this.setState({modalClassName : modalClassName});
      return;
    }

    if((!showModal) && (modalClassName > 0)) {
      //alert("removing " + modalClassName);
      modalClassName = modalClassName - 1;
      this.setState({modalClassName : modalClassName});

      if (modalClassName == 0) {
        this.advanceQuestion();
      }
      return;

    }




    var nextPause = this.state.nextPause;
    var currentTime = video.currentTime * 1000;
    if (currentTime < nextPause) { return; }

    video.pause();
    this.showQuestion();

  }


  showQuestion() {
    var myThis = this;

    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var questionNumber = this.state.questionNumber;
    var breakpoint = breakpoints[breakpointNumber];

    if (questionNumber >= breakpoint.questions.length) {
      myThis.advanceBreakpoint();
      return;
    }


    var question = breakpoint.questions[questionNumber];
    this.setState({question : question});

    //this.setState({modalClassName : "dragon-modal"});
    this.closeFullscreen();
    this.setState({showModal : true, videoClassname : "dragon-video-hide"});


  }

  submitAnswer(userAnswers, answerValues=[]) {

    if (!userAnswers.length) {
      this.setState({resultText: 'Please enter the answer'});
      return;
    }

    var myThis = this;

    var incentive = this.props.dragonfly.incentive;

    this.setState({isDisabled : "disabled"});

    var question = this.state.question;
    var answers = question.answers;

    var totalWeight = this.props.session.totalWeight;

    var correct = true;
    var correctAnswers = "";
    var isSelected = false;
    var type = question.type;

    //check if answer is correct
    if (type && type.survey) {
      var typeName = 'survey';
      var resultText = 'Any answer was correct.';
    } else if (type && type.openEnded) {
      var typeName = 'openEnded';
      var resultText = 'Thank you for your answer';
    } else {
      var typeName = 'multipleChoice';
      for (var i = 0; i < 5; i++) {
          if (answers[i].isCorrect) {
            correctAnswers += answers[i].letter;
          }

          isSelected = false;
          for (var j = 0; j < userAnswers.length; j++)
          {
            if (userAnswers[j] === answers[i].letter) isSelected = true;
          }

          if (answers[i].isCorrect && !isSelected) correct = false;
          if (!answers[i].isCorrect && isSelected) correct = false;
      }

      correctAnswers =  correctAnswers.split("").join(" and ");

      var resultText = correctAnswers + " was correct!";

      if (correct) {
        if (correctAnswers.length > 1) { resultText = correctAnswers + " were correct!"; }
      } else {
        resultText = "Sorry, the correct answer was " + correctAnswers + ".";
        if (correctAnswers.length > 1) { resultText = "Sorry, the correct answers were " + correctAnswers + "."; }
      }

    }

    var percentWeighting = question.weight / totalWeight;

    var value = percentWeighting * incentive;
    var earned = 0;
    if (correct) earned = value;

    if (type && type.openEnded) {
      var result = {correct: correct, type: typeName, resultText: resultText, value: value, earned: earned, openEndedAnswer: userAnswers};
    } else {
      var result = {correct: correct, type: typeName, resultText: resultText, value: value, earned: earned, selectedAnswers: userAnswers, answerValues: answerValues};
    }

    var totalEarned = this.state.earned + earned;
    var results = this.state.results;
    results.push(result);

    mixpanel.track('Answered Question(s)', {
      'DragonflyId': myThis.props.dragonfly.dragonflyId,
      'CampaignId': myThis.props.dragonfly.campaignId,
      'OrganizationId': myThis.props.dragonfly.organizationId,
      'Answers': userAnswers,
      'Question': question.title,
      'QuestionType': question.type,
      'ResultText': resultText
    });

    this.setState({ earned : totalEarned, results : results, resultText : resultText, submitButtonClassname : "dragon-hidden" });


    this.setState({ showModal : false, videoClassname : "dragon-video-show" });

    /*
    myTimeout = setTimeout(function(){
      myThis.advanceQuestion();

    }, 5000);
    */

  }

  advanceQuestion() {
    var myThis = this;
    //clearTimeout(myTimeout);
    this.setState({resultText: null, submitButtonClassname : "btn btn-primary"});
    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var questionNumber = this.state.questionNumber;

    var breakpoint = breakpoints[breakpointNumber];

    questionNumber = questionNumber + 1;

    if (questionNumber >= breakpoint.questions.length) {
      myThis.advanceBreakpoint();
      return;
    }

    this.setState({questionNumber : questionNumber});
    myThis.showQuestion();

  }




  advanceBreakpoint() {
    var myThis = this;
    var breakpoints = this.props.session.breakpoints;
    var breakpointNumber = this.state.breakpointNumber;
    var videoIsEnded = this.state.videoIsEnded;
    var video = document.getElementById("my-player");

    breakpointNumber = breakpointNumber + 1;

    if (breakpointNumber >= breakpoints.length) {
        this.setState({breakpointsAreComplete : true});
        this.setState({nextPause : 100000000});
        video.play();
        return;
    }

    var nextPause = breakpoints[breakpointNumber].milliseconds;

    this.setState({breakpointNumber : breakpointNumber,
                    questionNumber : 0,
                    nextPause : nextPause
    });

    video.play();

  }


  handleDragonflyComplete() {
    clearInterval(myInterval);
    var myThis = this;
    var earned = myThis.state.earned;
    var results = myThis.state.results;
    var dragonfly = myThis.props.dragonfly;
    dragonfly.earned = earned;
    dragonfly.results = results;
    myThis.props.handleLoadDragonfly(dragonfly);

    mixpanel.track('Dragonfly Ended', {
      'DragonflyId': dragonfly.dragonflyId,
      'CampaignId': dragonfly.campaignId,
      'FirstName': dragonfly.contact.first,
      'LastName': dragonfly.contact.last,
      'Email': dragonfly.contact.email,
      'Incentive': dragonfly.incentive,
      'CheckboxManualDemo': dragonfly.checkbox,
      'Earned': Number(earned).toFixed(2)
    });

    myThis.props.history.push('dragonflypreferences');
    return;
  }


  closeFullscreen() {
    var video = document.getElementById("my-player");
    if (video.exitFullscreen) {
      video.exitFullscreen();
    } else if (video.mozCancelFullScreen) { /* Firefox */
      video.mozCancelFullScreen();
    } else if (video.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      video.webkitExitFullscreen();
    } else if (video.msExitFullscreen) { /* IE/Edge */
      video.msExitFullscreen();
    }
  }


}

export default DragonflyPlayComponent;









class ModalComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
          selectedAnswers: [],
          answerValues: [],
          openEndedAnswer: ""
    };

    this.handleOpenEndedAnswer = this.handleOpenEndedAnswer.bind(this);
    this.submitAnswerClicked = this.submitAnswerClicked.bind(this);
    this.handleUpdateAnswer = this.handleUpdateAnswer.bind(this);
  }

  render() {
    var modalClassName = "dragon-modal opacity" + this.props.modalClassName;
    var question = this.props.question;
    var answersJsx = null;
    var title = null;

    if (question != null) {
      title = question.title;
      var answers = question.answers;
      var isDisabled = false;

      if (question.type && question.type.openEnded) {
        var inputValue = this.state.openEndedAnswer;
        var handleOpenEndedAnswer = this.handleOpenEndedAnswer;
        answersJsx = function() { return <OpenEndedAnswerComponent input={inputValue} handleUpdateAnswer={handleOpenEndedAnswer}/> }();
      } else {
        var handleUpdateAnswer = this.handleUpdateAnswer;
        answersJsx = answers.map((answer, i) => {
        if (answer.isValid) {
          return <MultipleAnswerComponent i={i} handleUpdateAnswer={handleUpdateAnswer} answer={answer} isDisabled={isDisabled} />;
        }
        });
      }
    }

    return (
            <div id="modal" className={modalClassName}>
              <form ref='uploadForm' onSubmit={this.submitAnswerClicked}>
                  <div className="dragon-modal-content">
                    <h3>{title}</h3>

                    {answersJsx}

                  </div>
                  <div className="dragon-modal-actionbox">
                    <input type="submit" className={this.props.submitButtonClassname} value="Submit Answer"/>

                    <span className="dragon-modal-result_text">
                      {this.props.resultText}
                    </span>

                  </div>
              </form>
            </div>
    );
  }

  handleOpenEndedAnswer(e) {
    this.setState({
      openEndedAnswer: e.target.value
    });
  }

  handleUpdateAnswer(answer) {
    var selectedAnswers = this.state.selectedAnswers;
    var answerValues = this.state.answerValues;

    if (answer.isSelected) {
      answerValues.push(answer.text);
      selectedAnswers.push(answer.letter);

      this.setState({
        selectedAnswers: selectedAnswers,
        answerValues: answerValues
      });
      return;
    }


    var selectedAnswersLength = selectedAnswers.length;
    var newSelectedAnswers = [];
    var newAnswerValues = []
    for (var i = 0; i < selectedAnswersLength; i++) {
        if ((selectedAnswers[i] != answer.letter) && (selectedAnswers[i] != null)){
          newSelectedAnswers.push(selectedAnswers[i]);
          newAnswerValues.push(answerValues[i]);
        }
    }
    this.setState({
      selectedAnswers: newSelectedAnswers,
      answerValues: newAnswerValues
    });

  }

  submitAnswerClicked(e) {
    e.preventDefault();
    this.setState({
      selectedAnswers: [],
      answerValues: [],
      openEndedAnswer: ""
     });
    if (this.state.selectedAnswers.length) {
      this.props.handleSubmitAnswer(this.state.selectedAnswers, this.state.answerValues);
    } else {
      this.props.handleSubmitAnswer(this.state.openEndedAnswer);
    }
  }

}





class MultipleAnswerComponent extends React.Component {
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
              {/* {this.props.answer.letter} */}
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






class OpenEndedAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="dragon-select-list-row">
          <textarea rows="5" cols="50" className="dragon-select-textarea" value={this.props.input} onChange={this.props.handleUpdateAnswer}/>
        </div>
    );
  }
}
