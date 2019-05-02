import React from 'react';

const buttonClassName = "btn btn-primary";

class ExportCampaignButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      csvGenerated: false,
      dragonfliesData: this.props.dragonfliesData,
      // check if i need it by updating the componnent and console logging the this.props.dragonfliesData
      filename: 'dragonflies.csv',
      data: '#!'
    };

    console.log(this.props);
    console.log(this.state);
  }

  render() {
    return (
      <a className={buttonClassName} onClick={this.handleOnClick.bind(this)} href={this.state.data} download={this.state.filename}>
        Click Me To Download
      </a>
    );
  }

  handleOnClick() {
    if (this.state.csvGenerated) {
      console.log('Trigger click from here');
    } else {
      console.log('Generate CSV here');
      this.setState({
        csvGenerated: true,
        data: 'data:text/csv;charset=utf-8,hello,brake,notbreak'
      });
    }
  }

}

export default ExportCampaignButton;
