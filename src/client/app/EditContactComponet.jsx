import React from 'react';


class EditContact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email : this.props.contact.email,
      firstName : this.props.contact.first,
      lastName : this.props.contact.last,
      isValid : true
    };
    this.updateFirstNameValue = this.updateFirstNameValue.bind(this);
    this.updateLastNameValue = this.updateLastNameValue.bind(this);
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

  }

  render() {

    var validityIndicator = 'fa fa-circle fa-fw dragon-gray';

    if (this.state.isValid) {
      validityIndicator = 'fa fa-check-circle fa-fw dragon-green';
    }



    return (
        <div className="dragon-select-list-cell">
            <div className="dragon-select-list-form-cell">
              <i className={validityIndicator}></i>
            </div>
            <div className="dragon-select-list-form-cell">
              <input defaultValue={this.props.contact.first} onChange={this.updateFirstNameValue} className="form-control" placeholder="first name"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input defaultValue={this.props.contact.last} onChange={this.updateLastNameValue} className="form-control" placeholder="last name"/>
            </div>
            <div className="dragon-select-list-form-cell">
              <input defaultValue={this.props.contact.email} onChange={this.updateEmailValue} className="form-control" placeholder="email"/>
            </div>
            <div className="dragon-select-list-form-cell" onClick={this.handleSaveContact.bind(this)}>
              <i className="fa fa-floppy-o fa-fw fa-lg"></i>
            </div>
            <div className="dragon-select-list-form-cell" onClick={this.handleCancelContact.bind(this)}>
              <i className='fa fa-times fa-fw fa-lg'></i>
            </div>
        </div>
    );
  }

  handleSaveContact() {
    this.props.handleLoadContact(this.state.firstName, this.state.lastName, this.state.email, this.state.isValid);
  }

  handleCancelContact() {
    this.props.handleCloseContactEdit();
  }

  updateFirstNameValue(e) {
    this.setState({
      firstName: e.target.value
    });
    this.validate(e.target.value, this.state.lastName, this.state.email);
  }

  updateLastNameValue(e) {
    this.setState({
      lastName: e.target.value
    });
    this.validate(this.state.firstName, e.target.value, this.state.email);
  }

  updateEmailValue(e) {
    this.setState({
      email: e.target.value
    });
    this.validate(this.state.firstName, this.state.lastName, e.target.value);
  }

  validate(first, last, email) {

    var firstNameIsValid = first.length > 0;
    var lastNameIsValid = last.length > 0;
    var emailIsValid = this.validateEmail(email);
    var isValid = firstNameIsValid && lastNameIsValid && emailIsValid;
    this.setState({
      isValid: isValid
    });

  }


  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

}


export default EditContact;
