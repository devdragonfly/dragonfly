import React from 'react';

const buttonClassName = "btn btn-primary";

class ExportCampaignButton extends React.Component {

  constructor(props) {
    super(props);
    this.href_base = 'data:text/csv;charset=utf-8,';

    this.state = {
                  csvGenerated: false,
                  filename: 'dragonflies.csv',
                  data: this.href_base
    };

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  render() {
    return (
      <a className={buttonClassName} onClick={this.handleOnClick} href={this.state.data} download={this.state.filename}>
        Click to download CSV
      </a>
    );
  }

  handleOnClick() {
    if (!this.state.csvGenerated) {
      this.setState({
        csvGenerated: true,
        data: this.buildCsvData()
      });
    }
  }

  buildCsvData() {
    var dragonfliesData = this.props.dragonfliesData;

    var preferedContactInfo = (preferences) =>  {
      return preferences.emailOrText == 'email' ? preferences.email : preferences.mobile
    };

    var formatDate = (date) => { return date ? new Date(date) : '' };

    var wrapInQuotes = (sentence) => '\"' + sentence + '\"';

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
      'Feedback'
    ];
    var body = '';

    // Append Headers with Campaign questions
    dragonfliesData[0].session.breakpoints.forEach(function(breakpoint){
      headers.push(
        wrapInQuotes(breakpoint.questions[0].title)
      );
    })
    headers = headers.join() + '\n';

    // Generate CSV records
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
          wrapInQuotes(preferedContactInfo(dragonfly.preferences)),
          wrapInQuotes(dragonfly.preferences.text)
        );

        dragonfly.results.forEach(function(result){
          row_array.push(
            wrapInQuotes(result.selectedAnswers[0])
          );
        });
      }

      body += (row_array.join() + '\n');
    });

    return this.href_base + headers + body;
  }

}

export default ExportCampaignButton;
