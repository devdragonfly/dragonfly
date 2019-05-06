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

    this.buildCsvData.bind(this);
    this.preferedContactInfo.bind(this);

    console.log(this.props);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h4>Export CSV</h4>
        <a className={buttonClassName} onClick={this.handleOnClick.bind(this)} href={this.state.data} download={this.state.filename}>
          Click Me To Download
        </a>
      </div>
    );
  }

  handleOnClick() {
    if (this.state.csvGenerated) {
      console.log('if');
    } else {
      console.log('else');

      this.setState({
        csvGenerated: true,
        data: this.buildCsvData()
      });

    }
  }

  buildCsvData() {
    var dragonfliesData = this.state.dragonfliesData;
    var quot = '\"';
    var headers = [
      'First Name',
      'Last Name',
      'Email',
      'Offered',
      'Earned',
      'NPS',
      'Prefered Contact Method',
      'Suggestion'
    ];
    var body = '';


    dragonfliesData[0].session.breakpoints.forEach(function(breakpoint){
      headers.push(qmark + breakpoint.questions[0].title + qmark);
    })
    headers = headers.join() + '\n';


    dragonfliesData.forEach(function(dragonfly) {
      var row_array = [];

      csv_file.body.push(
        dragonfly.contact.first,
        dragonfly.contact.last,
        dragonfly.contact.email,
        dragonfly.incentive,
        dragonfly.earned,
        dragonfly.preferences.nps,
        (qmark + this.preferedContactInfo(dragonfly.preferences) + qmark),
        (qmark + dragonfly.preferences.text + qmark)
      );

      dragonfly.results.forEach(function(result){
        
      });

      var row_string = row_array.join();
      body += (row_string + '\n');
    });

    return 'data:text/csv;charset=utf-8,' + (headers + '\n') + (body);
  }

  preferedContactInfo(preferences) {
    return preferences.emailOrText == 'email' ? preferences.email : preferences.mobile;
  }

}

export default ExportCampaignButton;
