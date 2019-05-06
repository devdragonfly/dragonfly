import React from 'react';

const buttonClassName = "btn btn-primary";

class ExportCampaignButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      csvGenerated: false,
      dragonfliesData: this.props.dragonfliesData,
      filename: 'dragonflies.csv',
      data: '#!'
    };

    this.handleOnClick = this.handleOnClick.bind(this)

    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h4>Export CSV</h4>
        <a className={buttonClassName} onClick={this.handleOnClick} href={this.state.data} download={this.state.filename}>
          Click to download CSV
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

    function preferedContactInfo(preferences) {
      return preferences.emailOrText == 'email' ? preferences.email : preferences.mobile;
    }

    function formatDate(date) {
      if (date){
        return new Data(date);
      }
      return '';
    }

    var headers = [
      'First Name',
      'Last Name',
      'Email',
      'Date Sent',
      'Offered',
      'Date Completed',
      'Earned',
      'NPS',
      'Prefered Contact Method',
      'Suggestion'
    ];
    var body = '';

    // Gets first Dragonfly and appends Compaign's questions to Headers
    dragonfliesData[0].session.breakpoints.forEach(function(breakpoint){
      headers.push(quot + breakpoint.questions[0].title + quot);
    })
    headers = headers.join() + '\n';

    dragonfliesData.forEach(function(dragonfly) {
      var row_array = [];

      row_array.push(
        dragonfly.contact.first,
        dragonfly.contact.last,
        dragonfly.contact.email,
        formatDate(dragonfly.date_sent),
        dragonfly.incentive,
      );

      if (dragonfly.date_completed) {
        row_array.push(
          formatDate(dragonfly.date_completed),
          dragonfly.earned,
          dragonfly.preferences.nps,
          (quot + preferedContactInfo(dragonfly.preferences) + quot),
          (quot + dragonfly.preferences.text + quot)
        );

        dragonfly.results.forEach(function(result){
          row_array.push( (quot + result.resultText + quot) );
        });
      }

      body += (row_array.join() + '\n');
    });

    return 'data:text/csv;charset=utf-8,' + headers + body;
  }

}

export default ExportCampaignButton;
