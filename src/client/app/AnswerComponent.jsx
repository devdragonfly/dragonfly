import React from 'react';


class AnswerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer
    };
    this.updateTextValue = this.updateTextValue.bind(this);
    this.updateIsCorrectValue = this.updateIsCorrectValue.bind(this);
  }

  render() {
    return (
        <div className="dragon-select-list-row">
            <div className="dragon-select-list-form-cell">
              {this.props.answer.letter}.
            </div>
            <div className="dragon-select-list-form-cell">
              <input value={this.state.answer.text} onChange={this.updateTextValue} className="form-control" placeholder="answer"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input type="checkbox" onChange={this.updateIsCorrectValue} value={this.state.answer.isCorrect} disabled={this.props.isSurvey} checked={this.state.answer.isCorrect} /> Correct
            </div>
        </div>
    );
  }

  updateTextValue(e) {
    var answer = this.state.answer;
    answer.text = e.target.value;
    this.setState({
      answer: answer
    });

    this.props.handleUpdateAnswer(answer);
  }


  updateIsCorrectValue(e) {
    var answer = this.state.answer;
    var isCorrect = answer.isCorrect;
    answer.isCorrect = !isCorrect;
    this.setState({
      answer: answer
    });

    this.props.handleUpdateAnswer(answer);

  }


}




export default AnswerComponent;
