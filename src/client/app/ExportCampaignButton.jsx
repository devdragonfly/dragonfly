import React from 'react';

const buttonClassName = "btn btn-primary";

class ExportCampaignButton extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.test);
    console.log(this.props.notTest);
  }

  render() {
    return (
      <button class={buttonClassName}>
        Click Me To Download
      </button>
    );
  }

}

export default ExportCampaignButton;
