//import { Config, CognitoIdentityCredentials } from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import appconfig from "./appconfig";


//Config.region = appconfig.region;

/*
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appconfig.IdentityPoolId
});
*/


const userPool = new CognitoUserPool({
  UserPoolId: appconfig.UserPoolId,
  ClientId: appconfig.ClientId,
});



const buttonClassName = "btn btn-primary btn-lg";

class SignUpComponent extends React.Component {

  constructor(props) {
    super(props);
    this.props.handleSignOut();
    this.state = {emailValue : props.email, 
                  passwordValue : '',
                  buttonRestClassName : buttonClassName,
                  buttonClickedClassName : "dragon-hidden"
    };
    this.updateEmailValue = this.updateEmailValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
    this.showClickedButtonState = this.showClickedButtonState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
  }

  render() {
    return (
      <div className="row home-bg-outer"><div className="col-sm-12">
      <div className="home-bg-inner">
      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-4">
          <br/><br/><br/><br/>
          <div className="signUpBox">
          
              <form onSubmit={this.handleSubmit}>
                          <h1 className="dragonfly-blue">Sign Up for Pre-Launch</h1>
                          <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
                          <br/>
                          <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg"/>
                          <br/>
                          <input type="submit" className={this.state.buttonRestClassName} value="Create Account" />
                          <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</div> 
              </form>
          </div>
          <br/><br/><br/><br/>
        </div>
        <div className="col-sm-1">
        </div>
        <div className="col-sm-5">
          <br/><br/>
            <video autoplay
                id="my-player"
                className="video-js vjs-default-skin vjs-big-play-centered"
                width="573" height="429"
                controls
                preload="auto"
                poster="./images/playHomeVideo.png"
                data-setup='{}'
                onClick={this.handleClickPlay}>
              <source src="https://s3-us-west-2.amazonaws.com/dragonfly-videos-transcoded/b777a5a6-4f3e-4d00-ae62-fb6ba768d79d/mp4-b777a5a6-4f3e-4d00-ae62-fb6ba768d79d.mp4" type="video/mp4"></source>
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
            </video>
            <br/><br/><br/>
        </div></div>

        <div className="col-sm-1">
        </div>
      
      </div>
      
      <div className="row question1and2">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                  <br/>
                  <div className="divCenter"><h3>1. What is Dragonfly Incentivized Information?</h3></div>
                  <br/><br/>
                  Dragonfly is a Saas platform that allows companies to pay customers to engage with information about their company and products. Customers are presented with information and are paid for answering questions correctly about the information, and providing their feedback. It creates an ongoing, two-way communication between companies and their customers.
                  <br/><br/>
                  <br/>
                  <div className="divCenter"><h3>2. Why do companies need Dragonfly?</h3></div>
                  <br/><br/>
                  Dragonfly was built on the belief that customers are so overwhelmed with emails, ads, and sales reps, and that they aren’t getting companies’ messages. In addition, companies don’t have an effective communication channel with their customers and have no way to document which customer knows what. Further, we believe the current b2b marketing method is backwards because money is allocated to bombarding customers with email, ads, and sales reps but none of that takes into account the value of the customer’s limited time. These are costly issues for companies.
                  <br/><br/>
                  At Dragonfly we believe paying customers for the time it takes to engage with information is the key to attracting their attention. We can then measure what information the customer learns and collect their feedback. We find this is a more effective form of communication and creates a better experience for both companies and customers. 
                  <br/><br/><br/>
            </div>
            <div className="col-sm-1"></div>
      </div>
      <div className="row question3and4">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <br/>
                <div className="divCenter"><h3>3. How do companies use Dragonfly?</h3></div>
                <br/><br/>
                Companies use Dragonfly any time they are sharing and requesting important information from a customer. Nearly any information that a sales rep, an ad, or an email would share can be put into a Dragonfly. Pre-sale, Dragonfly can handle qualifying and screening, asking questions and sharing information, and capturing and overcoming objections. Post sale, Dragonfly can handle product training, user adopting, new messaging, and referrals. Being able to provide uniform and consistent messaging, across all of these areas, with metrics for each customer, are some of the main values of Dragonfly.
                <br/><br/>
                <br/>
                <div className="divCenter"><h3>4. Is this the end of Sales Reps?</h3></div>
                <br/><br/>
                No, companies will need sales people to oversee Dragonfly incentives, determine which customers receive Dragonflys, monitor results, and handle customer inquiries. The number of needed sales reps and managers will be less and the majority of the information sharing, pre and post sale, will be handled by Dragonflys.
                <br/><br/>
                Newer companies will build their sales process almost entirely using Dragonflys because it is more effective and less costly than using sales reps. Existing companies will use Dragonflys in conjunction with sales reps initially and they will increasingly move more resources to Dragonfly as they experience the cost savings and other benefits of Dragonfly.
                <br/><br/>
                Once customers learn about the benefits of Dragonflys, we believe they will request them.
                <br/><br/><br/>
            </div>
            <div className="col-sm-1"></div>
      </div>
      <div className="row question5and6">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <br/>
                <div className="divCenter"><h3>5. What does Dragonfly cost?</h3></div>
                <br/><br/>
                One of the great advantages of Dragonfly is there is no cost until your customer successfully engages with your content. This means every dollar spent on your Dragonflys is 100% effective. When your customers do successfully complete your Dragonfly session, you pay their incentive and a Dragonfly fee.
                <br/><br/>
                <br/>
                <div className="divCenter"><h3>6. What’s the catch?</h3></div>
                <br/><br/>
                There is no catch. We believe incentivized information is a more effective solution for companies to communicate with their customers. Besides asking customers for the best email or phone number to pay their incentives, we do not collect any information on individual companies or customers and we do not share or sell any information to third parties.     
                <br/><br/><br/>
            </div>
            <div className="col-sm-1"></div>
      </div>
      <div className="row question7and8">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <br/>
                <div className="divCenter"><h3>7. What is Pre-Launch?</h3></div>
                <br/><br/>
                We are currently in beta testing and because Dragonfly Incentivized Information is a new solution, we are learning and iterating at a fast pace. Pre-Launch will begin in late 2018 after beta testing is complete and will involve a limited number of companies. These companies will have the advantage of receiving free consulting, having access to pre-launch info and trends, and getting a jump start on their competition for implementing their Dragonfly campaigns.
                <br/><br/>
                <br/>
                <div className="divCenter"><h3>8. How do I find out more information?</h3></div>
                <br/><br/>
                Email us at info@dragonfly.one
                <br/><br/><br/>
            </div>
            <div className="col-sm-1"></div>
      </div>
      </div></div>
      
      
      
    );
  }
  
  handleClickPlay(e) {
    var video = e.target;
    video.play();
  }

  showClickedButtonState(yes) {
    if (yes) {
          this.setState({ buttonRestClassName: "dragon-hidden" });
          this.setState({ buttonClickedClassName: buttonClassName });
    } else {
          this.setState({ buttonRestClassName: buttonClassName });
          this.setState({ buttonClickedClassName: "dragon-hidden" });
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
    
    const email = this.state.emailValue.trim();
    const password = this.state.passwordValue.trim();
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];
    
    
    var cognitoUser;
    var myThis = this;
    
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      myThis.showClickedButtonState(false);
        if (err) {
          alert(err);
          return;
        }
      cognitoUser = result.user;
      myThis.props.handleLoadEmail(email);
      myThis.props.history.push('confirmregistration');
    });
  }

}

export default SignUpComponent;