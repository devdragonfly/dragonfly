import React from 'react';

const buttonClassName = 'btn btn-primary';
const errorMessage = 'Sorry! Error occured during CSV file generation'
const fileBase = 'data:text/csv;charset=utf-8,';

class ExportCampaignButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                  csvAlreadyGenerated: false,
                  filename: 'dragonflies.csv',
                  fileContent: encodeURI(fileBase + errorMessage)
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  render() {
    return (
      <a className={buttonClassName} onClick={this.handleOnClick} href={this.state.fileContent} download={this.state.filename}>
        Click to download CSV
      </a>
    );
  }

  handleOnClick() {
    if (!this.state.csvAlreadyGenerated) {
      this.setState({
        csvAlreadyGenerated: true,
        fileContent: this.buildCsvData()
      });
    }
  }

  buildCsvData() {
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
    const dragonfliesData = this.props.dragonfliesData;
    const preferedContactInfo = preferences =>  {
      return preferences.emailOrText == 'email' ? preferences.email : preferences.mobile
    };
    const formatDate = date => date ? new Date(date) : '';
    const wrapInQuotes = sentence => '\"' + sentence + '\"';
    const fillEmptyFields = fieldsCount => {
      var result = '';
      for (var i = 0; i < columnsEmptyByDefault; i++) {
        result += '-,'
      }
      return result;
    }

    // Append Headers with Campaign questions
    if (dragonfliesData[0].session.breakpoints) {
      dragonfliesData[0].session.breakpoints.forEach( breakpoint => {
        if (breakpoint.questions) {
          breakpoint.questions.forEach( question => {
            headers.push( wrapInQuotes(question.title) );
          });
        }
      });
    }
    // These must be defined after all headers set up
    const columnsFilledByDefault = 6;
    const columnsEmptyByDefault = headers.length - columnsFilledByDefault;
    headers = headers.join() + '\n';

    // Generate CSV records
    dragonfliesData.forEach( dragonfly => {
      var record_attributes = [];

      record_attributes.push(
        dragonfly.contact.first,
        dragonfly.contact.last,
        dragonfly.contact.email,
        formatDate(dragonfly.date_sent),
        dragonfly.incentive,
      );

      if (dragonfly.date_completed) {
        record_attributes.push(
          formatDate(dragonfly.date_completed),
          dragonfly.earned,
          dragonfly.preferences.nps,
          wrapInQuotes(preferedContactInfo(dragonfly.preferences)),
          wrapInQuotes(dragonfly.preferences.text)
        );


        dragonfly.results.forEach( result => {
          if (result.type == 'openEnded') {
            record_attributes.push( wrapInQuotes(result.openEndedAnswer) );
            return;
          }
          record_attributes.push( wrapInQuotes(result.answerValues.join()) );
        });
      } else {
        record_attributes.push(
          wrapInQuotes('Not Completed'),
          fillEmptyFields(columnsEmptyByDefault)
        );
      }

      body += (record_attributes.join() + '\n');
    });

    return encodeURI(fileBase + headers + body);
  }

}

export default ExportCampaignButton;
