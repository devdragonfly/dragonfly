import React from 'react';

class MillisecondsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    var milliseconds = this.props.milliseconds;
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = milliseconds - (seconds * 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);

    return (
        <span><i className='fa fa-pause-circle fa-fw'></i> {minutes} M : {seconds} S . {milliseconds} ms</span>
    );
  }


}


export default MillisecondsComponent;