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
    // this.props.handleSignOut();
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
      <div className="row"><div className="col-sm-12 dragon-white">

      <br/><br/>

      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-10 divCenter">
          <span className="dragon-home-header">Create Ongoing Information Engagement<br/>with Your Customers</span>
        </div>
        <div className="col-sm-1">
        </div>
      </div>

      <br/><br/><br/><br/><br/>


      <div className="row lite-blue-bg">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-4 divCenter">
        <br/><br/><br/>
          <span className="dragon-standard-text">
          Dragonfly allows you to compensate your Customers for Learning about your Company and Products,
          providing their Feedback, and Sharing other requested Information. <br/><br/>
          The result is an Ongoing, Documentable, Two-Way Information Exchange with your Customers.
          </span>
        <br/><br/><br/>
        </div>
        <div className="col-sm-2">
        </div>
        <div className="col-sm-4 divCenter">
        <br/><br/><br/><br/><br/><br/>
                <div className="dragon-blue-rounded">
                <img src="./images/dragonfly2.png" className="dragonfly-kiss" />
                    <form onSubmit={this.handleSubmit}>
                                Create Your Free Account
                                <br/><br/>
                                <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
                                <br/>
                                <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg"/>
                                <br/>
                                <input type="submit" className={this.state.buttonRestClassName} value="Create Account" />
                                <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</div>
                    </form>
                </div>
        <br/><br/><br/>
        </div>
        <div className="col-sm-1">
        </div>
      </div>



      <br/><br/>




    <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-4">
              <br/><br/><br/>
              <div className="dragon-blue-rounded divRight">Dragonfly is built on the belief that customers are so overwhelmed by emails, ads, and sales reps that they aren't getting the message.</div>
              <br/><br/><br/>
            </div>
            <div className="col-sm-2 divCenter">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <img src="./images/CustomerImageAdsEmailSalesReps.PNG" className="fitToDiv" />
            </div>
            <div className="col-sm-4">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <div className="dragon-blue-rounded divLeft">Dragonfly incentivizes information engagement and allows you to measure company and product knowledge for each of your customers.</div>
              <br/><br/><br/>
            </div>
            <div className="col-sm-1"></div>
    </div>



    <br/><br/>



    <div className="row lite-blue-bg">
            <div className="col-sm-4 divCenter">
              <br/><br/><br/>
              <span className="dragon-standard-text">Connect with your Customers</span>
              <br/><br/><br/>
              <img src="./images/Company_dragonfly_customer.png" />
              <br/><br/><br/>
              <span className="dragon-standard-text">Incentivizing information encourages customer engagement</span>
              <br/><br/><br/>
            </div>
            <div className="col-sm-4 divCenter">
              <br/><br/><br/>
              <span className="dragon-standard-text">Pre and Post Sale</span>
              <br/><br/><br/>
              <img src="./images/Pre_Post_Sale.png" />
              <br/><br/><br/>
              <span className="dragon-standard-text">Dragonfly handles information sharing for sales and customer success teams</span>
              <br/><br/><br/>
            </div>
            <div className="col-sm-4 divCenter">
              <br/><br/><br/>
              <span className="dragon-standard-text">Document Engagement</span>
              <br/><br/><br/>
              <img src="./images/Dragonfly_Graph.png" />
              <br/><br/><br/>
              <span className="dragon-standard-text">Measuring what your customers know allows for strategic and progressive messaging</span>
              <br/><br/><br/>
            </div>
    </div>



    <br/><br/><br/><br/>



      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-5 divCenter">
            <span className="dragon-home-header">How Dragonfly Works</span><br/>
            <img src="./images/DragonflyGif222.gif" className="fitToDiv"/>
        </div>
        <div className="col-sm-5 divCenter">
          <div className="dragon-blue-rounded">
            Would you like to receive a paid dragonfly?
            <br/><br/>
            We are currently targeting B2B Sales Management and Marketing roles - Director level and up.
            <br/><br/>
            admin@dragonfly.one
          </div>
        </div>
        <div className="col-sm-1">
        </div>
      </div>

      <br/><br/><br/><br/>


      <div className="row">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-10 divCenter">
            <span className="dragon-home-header">How Companies Use Dragonfly</span>
            <br/><br/>
            <img src="./images/HowCompaniesUseDragonfly.PNG" />
            <br/><br/><br/>
            <img src="./images/dragonfly-section.png" />
        </div>
        <div className="col-sm-1">
        </div>
      </div>


      <br/><br/><br/><br/><br/><br/><br/>



      <div className="row lite-blue-bg">
        <div className="col-sm-1">
        </div>
        <div className="col-sm-4 divCenter">
        <br/><br/><br/>
          <span className="dragon-home-header-pricing">Pricing</span>
          <div className="dragon-blue-rounded-left">

          <span className="underline">Free</span>

          <br/><br/>
          <ul>
            <li>Create Account</li>
            <li>Send Unlimited Dragonfly Sessions</li>
          </ul>
          <br/><br/>

          <span className="underline">Risk Free</span>

          <br/><br/>
          <ul>
            <li>Only Pay for Successful Dragonfly Sessions</li>
          </ul>
          <br/><br/>

          <span className="underline">Fees</span>

          <br/><br/>
          <ul>
            <li>Customer Incentive</li>
            <li>+ Dragonfly Success Fee</li>
          </ul>
          <br/>


          <span className="fine-print">
          Customer Incentive = Amount Paid for Answering Questions<br/>
          Dragonfly Success Fee = 33% of Customer Incentive<br/>
          Dragonfly Success Fee Decreases with Volume Commitment
          </span>



          </div>
        <br/><br/><br/>
        </div>
        <div className="col-sm-2">
        </div>
        <div className="col-sm-4 divCenter">
        <br/><br/><br/><br/><br/><br/>
                <div className="dragon-blue-rounded">
                <img src="./images/dragonfly2.png" className="dragonfly-kiss" />
                    <form onSubmit={this.handleSubmit}>
                                Create Your Free Account
                                <br/><br/>
                                <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg"/>
                                <br/>
                                <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg"/>
                                <br/>
                                <input type="submit" className={this.state.buttonRestClassName} value="Create Account" />
                                <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</div>
                    </form>
                </div>
        <br/><br/><br/>
        </div>
        <div className="col-sm-1">
        </div>
      </div>


      <div className="row footer">
        <div className="col-sm-6 footer-left">

        <br/><br/>

        Want to learn more?

        <br/><br/>

        Contact us:&nbsp;&nbsp;
        <a href="mailto:admin@dragonfly.one" className="dragonfly-contact">admin@dragonfly.one</a>

        <br/><br/>

        </div>
        <div className="col-sm-6 footer-right">

        <br/><br/>

        <br/><br/>

        <br/><br/>
        ©Dragonfly Incentivized Information LLC 2018


        </div>
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
      mixpanel.track("Signup", {
        'Email': email
      });
      cognitoUser = result.user;
      myThis.props.handleLoadEmail(email);
      myThis.props.history.push('confirmregistration');
    });
  }

}

export default SignUpComponent;
