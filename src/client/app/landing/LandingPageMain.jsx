import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "../appconfig";

Config.region = appconfig.region;

Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appconfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});

const buttonClassName = "btn btn-primary btn-lg";

class LandingPageMain extends React.Component {

  constructor(props) {
    super(props);
    // this.props.handleSignOut();
    // this.state = {
    //   emailValue: props.email,
    //   passwordValue: '',
    //   buttonRestClassName: buttonClassName,
    //   buttonClickedClassName: "dragon-hidden"
    // };
    // this.updateEmailValue = this.updateEmailValue.bind(this);
    // this.updatePasswordValue = this.updatePasswordValue.bind(this);
    // this.showClickedButtonState = this.showClickedButtonState.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClickPlay = this.handleClickPlay.bind(this);

    //Login Form Construct
    this.state = {emailValue : props.email,
                  passwordValue : '',
                  // buttonRestClassName : buttonClassName,
                  // buttonClickedClassName : "dragon-hidden"

    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    // this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  createMarkup() {
    return {__html: '<main> <section id="home" class="home-banner"> <div class="effect"></div><div class="container"> <div class="row align-items-center justify-content-center"> <div class="col-12 col-lg-10"> <div class="hb-text"> <h3>Start <b>engaging</b> with your customers.</h3> <p>Incentivize your customers for learning about your products, sparking engagement and knowledge you can measure. <b>Try it out for free today.</b></p></div><div class="hb-form"> <form> <div class="row"> <div class="col-md-4"> <input name="email" class="form-control" placeholder="Email Address" type="email"/> </div><div class="col-md-4"> <input name="password" class="form-control" placeholder="Password" type="password"/> </div><div class="col-md-4"> <button class="m-btn m-btn-theme">Create Account</button> </div></div></form> </div></div></div></div></section> <section id="about" class="section-top-up gray-bg"> <div class="container"> <div class="row"> <div class="col-md-4 m-15px-tb"> <div class="feature-box"> <div class="icon"><i class="fas fa-edit color-yellow"></i></div><div class="feature-content"> <h5>Create</h5> <p>Build out customizable, interactive videos. Upload your video and add questions throughout to measure customer understanding, request feedback, and track customer knowledge.</p><div class="btn-bar"><a class="m-btn-icon theme-light" href="#"><i class="fa fa-chevron-right"></i></a> </div></div></div></div><div class="col-md-4 m-15px-tb"> <div class="feature-box"> <div class="icon"><i class="fas fa-paper-plane color-blue"></i></div><div class="feature-content"> <h5>Engage</h5> <p>Connect with your customers by compensating them for learning about your products, providing feedback, or simply sharing their thoughts. The result is an ongoing engagement with your customers. </p><div class="btn-bar"><a class="m-btn-icon theme-light" href="#"><i class="fa fa-chevron-right"></i></a> </div></div></div></div><div class="col-md-4 m-15px-tb"> <div class="feature-box"> <div class="icon"><i class="fas fa-check-double color-green"></i></div><div class="feature-content"> <h5>Measure</h5> <p>Gaining contact-level visibility into your customer’s knowledge, makes it easy to measure the success of your messaging across your entire customer base.</p><br/> <div class="btn-bar"><a class="m-btn-icon theme-light" href="#"><i class="fa fa-chevron-right"></i></a> </div></div></div></div><div class="col-12"> <div class="more-btn more-btn-bottom m-80px-t sm-m-40px-t"> <a class="m-btn m-btn-round m-btn-theme" href="#">Learn More</a> </div></div></div></div></section> <section id="feature" class="section effect-section"> <div class="effect-01 left"></div><div class="container"> <div class="row justify-content-center sm-m-45px-b m-60px-b"> <div class="col-lg-8 col-md-10"> <div class="section-title text-center"> <h2><small>Uniform, scalable, and documentable information sharing for your marketing, sales, and customer success teams.</small></h2> </div></div></div><div class="row align-items-center"> <div class="col-lg-6"> <div class="side-feature sm-p-0px-r md-p-30px-r p-70px-r"> <label class="theme-color">Improve Customer Communication</label> <h2>Create effective and efficient sales and customer success processes</h2> <p class="large">Dragonfly supplements your sales, and customer success processes freeing up teammates to focus on high-level customer interactions.</p><hr class="m-25px-tb"/> <ul class="list-type-01"> <li> <div class="icon yellow"> <i class="fas fa-asterisk"></i> </div><h6>Improve communication skills</h6> <a class="m-link" href="#">Learn more about <i class="fas fa-long-arrow-alt-right"></i></a> </li></ul> </div></div><div class="col-lg-6"> <div class="side-feature sm-p-0px-l md-p-40px-l p-70px-l"> <label class="theme-color">Build a database of customer knowledge</label> <h2>Make smarter business decisions with data analysis</h2> <p class="large">Dragonfly gives you the power to measure your messaging coverage and impact allowing you to see where you need to apply information to increase sales.</p><br/> <hr class="m-25px-tb"/> <ul class="list-type-01"> <li> <div class="icon blue"> <i class="fas fa-database"></i> </div><h6>Faster Smarter</h6> <a class="m-link" href="#">Learn more about <i class="fas fa-long-arrow-alt-right"></i></a> </li></ul> </div></div></div></div></section> <section id="feature" class="section p-0px-b effect-section gray-bg"> <div class="bg-effect bg-cover bg-no-repeat gb-ef70 theme-bg"></div><div class="container"> <div class="row justify-content-center m-60px-b sm-m-40px-b"> <div class="col-lg-8 col-md-10"> <div class="section-title text-center"> <h2 class="white-color">What is incentivized information?</h2> <p class="white-color-light">Dragonfly incentivizes information engagement and allows you to measure company and product knowledge for each of your customers.</p></div></div></div><div class="row justify-content-center"> <div class="col-md-12 col-lg-10"> <div class="video-box bg-cover bg-no-repeat" style="background-color: #081526; background-image: url(assets/images/video_thumbnails/how_it_works_video_thumb.png);"> <div class="video-area"> <a class="video-btn white popup-youtube" href="https://www.youtube.com/watch?v=Raj3NSc8Mjw"><span></span></a> </div></div></div></div></div></section> <section id="how_it_works" class="section gray-bg"> <div class="container"> <div class="row justify-content-center sm-m-25px-b m-45px-b"> <div class="col-lg-8 col-md-10"> <div class="section-title text-center"> <h2>How Does Dragonfly Work?</h2> <p>Building a Dragonfly session is simple.</p></div></div></div><div class="flow-section p-40px-t md-p-15px-t"> <div class="flow-row flow-row-1st"> <div class="no-gutters row"> <div class="col-lg-4"> <div class="flow-col flow-col-left"> <div class="flow-col-in"> <div class="icon"><i class="fab fa-youtube"></i></div><h4>Upload Video</h4> <p>Upload any type of video about your company or products.</p><br/> <br/> </div></div></div><div class="col-lg-4"> <div class="flow-col flow-col-left"> <div class="flow-col-in"> <div class="icon"><i class="fas fa-question"></i></div><h4>Add Questions</h4> <p>Add breakpoints anywhere you want throughout the video to ask any question you want about your video.</p></div></div></div><div class="col-lg-4"> <div class="flow-col flow-col-left"> <div class="flow-col-in"> <div class="icon"><i class="fas fa-address-book"></i></div><h4>Import Contacts</h4> <p>Dragonfly allows you to import contacts by Excel or add contacts manually.</p><br/> </div></div></div></div></div><div class="flow-row flow-row-2nd"> <div class="no-gutters row"> <div class="col-lg-4"> <div class="flow-col flow-col-right"> <div class="flow-col-in"> <div class="icon"><i class="fas fa-clipboard-list"></i></div><h4>Create Campaigns</h4> <p>Customize the opening and closing messaging, add your logo and specify your customer incentive amount.</p></div></div></div><div class="col-lg-4"> <div class="flow-col flow-col-right"> <div class="flow-col-in"> <div class="icon"><i class="fas fa-paper-plane"></i></div><h4>Send Your Dragonfly</h4> <p>Paste your Dragonfly link anywhere you reach your customers such as text, email, or any social media platform.</p></div></div></div><div class="col-lg-4"> <div class="flow-col flow-col-right"> <div class="flow-col-in"> <div class="icon"><i class="fas fa-chart-line"></i></div><h4>Measure Engagement</h4> <p>Track which customers engage with which information so you can progressively build your messaging with them.</p></div></div></div></div></div></div></div></section> <section id="price" class="section theme-bg"> <div class="container"> <div class="row justify-content-center sm-m-25px-b m-45px-b"> <div class="col-lg-8 col-md-10"> <div class="section-title text-center"> <h2 class="white-color">Risk-Free Pricing</h2> <p class="white-color-light">With dragonfly our risk-free pricing model ensures that you only pay for successfully completed dragonfly sessions</p></div></div></div><div class="row"> <div class="col-lg-4 m-15px-tb"> <div class="price-table-02"> <div class="pt-head pt-white"> <h6 style="color: #fff !important;">Getting Started</h6> <div class="pt-price" style="color: #fff !important;"> <span></span>Free </div></div><div class="pt-body"> <ul> <li class="white-color-light">Create Your Account</li><li class="white-color-light">Create Unlimited Dragonflies</li></ul> </div></div></div><div class="col-lg-4 m-15px-tb"> <div class="price-table-02 active"> <div class="pt-head"> <h6>Using Dragonfly</h6> <div class="pt-price"> Risk Free </div></div><div class="pt-body"> <ul> <li>Only pay for <b class="text-primary" style="text-transform: uppercase !important;">successfully completed</b> Dragonfly sessions</li></ul> <ul><br/></ul> </div></div></div><div class="col-lg-4 m-15px-tb"> <div class="price-table-02"> <div class="pt-head"> <h6 style="color: #fff !important;">Final Cost</h6> <div class="pt-price" style="color: #fff !important; font-size: 30px;"> <small>Customer Incentive + Success Fee</small> </div></div><div class="pt-body"> <ul> <li class="white-color-light">Success Fee is 33% of paid incentives</li><li class="white-color-light">Decreases with volume commitment</li></ul> </div></div></div></div></div></section> <section id="get_started" class="section section-get-started theme-bg"> <div class="container"> <div class="row justify-content-center sm-m-25px-b m-45px-b"> <div class="col-lg-8 col-md-10"> <div class="section-title text-center"> <h2 class="white-color">Get started by creating a free account today.</h2> </div></div></div><div class="row justify-content-center"> <div class="col-md-9 col-lg-7"> <div class="create-account-form"> <form> <div class="row"> <div class="col-md-4"> <input name="email" class="form-control" placeholder="Email Address" type="email"/> </div><div class="col-md-4"> <input name="password" class="form-control" placeholder="Password" type="password"/> </div><div class="col-md-4"> <button class="m-btn m-btn-theme">Create Account</button> </div></div></form> </div></div></div></div></section></main><footer class="footer-one"> <div class="footer-top"> <div class="container"> <div class="row"> <div class="col-lg-3 col-sm-6 m-15px-tb"> <div class="footer-about"> <div class="fot-logo"> <a href="#"> <img src="assets/images/logos/logo-full-trans.png" title="" alt=""/> </a> </div><p>Creating engagement with your customers.</p><ul class="fot-icon"> <li><a href="https://www.facebook.com/DragonflyIncentivizedInformation/" target="_blank"><i class="fab fa-facebook-f"></i></a></li><li><a href="https://twitter.com/dragonfly_one" target="_blank"><i class="fab fa-twitter"></i></a></li><li><a href="https://www.linkedin.com/company/dragonfly-incentivized-information" target="_blank"><i class="fab fa-linkedin-in"></i></a></li></ul> </div></div><div class="col-lg-1 col-sm-6 m-15px-tb"> </div><div class="col-lg-5 col-sm-6 m-15px-tb"> <div class="footer-link"> <h5 class="fot-title">Site Links</h5> <ul> <li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#feature">Applications</a></li><li><a href="#how_it_works">How it Works?</a></li><li><a href="#price">Pricing</a></li><li><a href="#get_started">Get Started</a></li></ul> </div></div><div class="col-lg-3 col-sm-6 m-15px-tb"> <div class="footer-info"> <h5 class="fot-title">Contact Us</h5> <address> <p>528 N 12th St.</p><p>San Jose, CA</p><p>95112</p><br/> <p class="email"><a href="mailto:admin@dragonfly.one">admin@dragonfly.one</a></p><p class="call"><a href="tel:408-212-6062">408-212-6062</a></p></address> </div></div></div></div></div><div class="footer-bottom"> <div class="container"> <div class="row"> <div class="col-md-6 text-center text-md-left"> <p>© 2019 Dragonfly Incentivized Information, LLC. All Rights Reserved</p></div><div class="col-md-6 text-center text-md-right"> <ul> <li><a href="#">Privacy Policy</a></li></ul> </div></div></div></div></footer>'};
  }


  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()}></div>;
  }

  // handleClickPlay(e) {
  //   var video = e.target;
  //   video.play();
  // }

  // showClickedButtonState(yes) {
  //   if (yes) {
  //     this.setState({ buttonRestClassName: "dragon-hidden" });
  //     this.setState({ buttonClickedClassName: buttonClassName });
  //   } else {
  //     this.setState({ buttonRestClassName: buttonClassName });
  //     this.setState({ buttonClickedClassName: "dragon-hidden" });
  //   }
  // }

  // updateEmailValue(e) {
  //   this.setState({
  //     emailValue: e.target.value
  //   });
  // }

  // updatePasswordValue(e) {
  //   this.setState({
  //     passwordValue: e.target.value
  //   });
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.showClickedButtonState(true);

  //   const email = this.state.emailValue.trim();
  //   const password = this.state.passwordValue.trim();

  //   const attributeList = [
  //     new CognitoUserAttribute({
  //       Name: 'email',
  //       Value: email
  //     })
  //   ];


  //   var cognitoUser;
  //   var myThis = this;

  //   userPool.signUp(email, password, attributeList, null, (err, result) => {
  //     myThis.showClickedButtonState(false);
  //     if (err) {
  //       alert(err);
  //       return;
  //     }
  //     mixpanel.identify(email);
  //     mixpanel.people.set({
  //       "$email": email,
  //       "$created": new Date()
  //     });
  //     mixpanel.track("Creates Account", {
  //       'Email': email
  //     });
  //     cognitoUser = result.user;
  //     myThis.props.handleLoadEmail(email);
  //     myThis.props.history.push('confirmregistration');
  //   });
  // }


  //Login Functions
  // showClickedButtonState(yes) {
  //   if (yes) {
  //         this.setState({ buttonRestClassName: "dragon-hidden" });
  //         this.setState({ buttonClickedClassName: buttonClassName });
  //   } else {
  //         this.setState({ buttonRestClassName: buttonClassName });
  //         this.setState({ buttonClickedClassName: "dragon-hidden" });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({emailValue : nextProps.email});
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
    // this.showClickedButtonState(true);
    var myThis = this;

    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();

    this.props.handleLoadEmail(email);
    this.props.handleAuthenticate(email, password, function(){
      // myThis.showClickedButtonState(false);
      myThis.props.history.push('loadorganizations');
    }, function(){
      // myThis.showClickedButtonState(false);
      alert("Sorry, your email or password were incorrect.");
    });


  }

}

export default LandingPageMain;
