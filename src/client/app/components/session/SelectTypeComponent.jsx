import React from 'react';

export default class SelectTypeComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var type = this.props.questionType;
    var handleSelect = this.props.selectHandler;
    return (
      <div className='select-question-type__container'>
        <input value='multipleChoice' id='1' name='multipleChoice' type='radio' checked={type.multipleChoice} onChange={handleSelect}/>
        <label for='1'> Multiple Choice </label>
        <input value='openEnded' id='2' name='openEnded' type='radio' checked={type.openEnded} onChange={handleSelect}/>
        <label for='2'> Open-Ended </label>
        <input value='survey' id='3' name='survey' type='radio' checked={type.survey} onChange={handleSelect}/>
        <label for='3'> Survey </label>
      </div>
    );
  }

}
