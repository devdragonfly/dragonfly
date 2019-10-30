import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';


const buttonClassName = "m-btn m-btn-theme";

class NavOutsideComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailValue: props.email,
      passwordValue: '',
      buttonRestClassName: buttonClassName,
      buttonClickedClassName: "dragon-hidden"

    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ emailValue: nextProps.email });
  }

  render() {
    return (
      <div className="row dragon-navbar-outside">

        <header className="header-nav header-light">
          <nav className="navbar navbar-expand-lg">
            <div className="container container-large">
              <div className="col-auto p-0px-l">
                <a className="navbar-brand" href="#">
                  <img className="light-logo" src="assets/images/logos/logo-trans.png" title="" alt="" width="auto" height="70px" />
                  <img className="dark-logo" src="assets/images/logos/logo-full.png" title="" alt="" width="auto" height="70px" />
                </a>
              </div>

              <div className="col-lg col-md-12 order-lg-0 order-3 m-auto position-static">
                <div className="collapse navbar-collapse justify-content-end" id="navbar">
                  <ul className="navbar-nav ml-auto align-items-lg-center">
                    <li><a className="nav-link" href="#home">Home</a></li>
                    <li><a className="nav-link" href="#about">About</a></li>
                    <li><a className="nav-link" href="#feature">Applications</a></li>
                    <li><a className="nav-link" href="#how_it_works">How it Works?</a></li>
                    <li><a className="nav-link" href="#price">Price</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-auto p-0px-lr">
                <div className="h-search d-inline-block">
                  <span className="h_search">Sign In</span>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                  aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span>
                </button>
              </div>

            </div>
          </nav>
        </header>

        <div className="h-search-section">
          <label className="h_search"><i className="fas fa-times"></i></label>
          <div className="container">
            <div className="row full-screen justify-content-center align-items-center">
              <div className="col-md-10 col-lg-8">
                <div className="h-search-form">
                  <h5>Enter your account credentials below to log in.</h5>
                  <div className="create-account-form">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-md-4">
                          <input value={this.state.emailValue} onChange={this.updateEmailValue} name="email" className="form-control" placeholder="Email Address" type="email" />
                        </div>
                        <div className="col-md-4">
                          <input value={this.state.passwordValue} onChange={this.updatePasswordValue} name="password" className="form-control" placeholder="Password" type="password" />
                        </div>
                        <div className="col-md-4">
                          <button type="submit" className={this.state.buttonRestClassName} className="m-btn m-btn-theme">Login</button>
                          <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Signing In</div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }


  showClickedButtonState(yes) {
    if (yes) {
      this.setState({ buttonRestClassName: "dragon-hidden invisible" });
      this.setState({ buttonClickedClassName: buttonClassName });
    } else {
      this.setState({ buttonRestClassName: buttonClassName });
      this.setState({ buttonClickedClassName: "dragon-hidden invisible" });
    }
  }

  updateEmailValue(e) {
    this.setState({
      emailValue: e.target.value
    });
  }

  updatePasswordValue(e) {
    this.setState({
      passwordValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showClickedButtonState(true);
    var myThis = this;

    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();

    this.props.handleLoadEmail(email);
    this.props.handleAuthenticate(email, password, function () {
      myThis.showClickedButtonState(false);
      myThis.props.history.push('loadorganizations');
    }, function () {
      myThis.showClickedButtonState(false);
      alert("Sorry, your email or password were incorrect.");
    });


  }
}

export default NavOutsideComponent;
