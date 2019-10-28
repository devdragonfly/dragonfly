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

const buttonClassName = "m-btn m-btn-theme";


class LandingPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.handleSignOut();
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
        this.handleClickPlay = this.handleClickPlay.bind(this);


    }

    render() {

        var videoThumbStyle = {
            backgroundImage: 'url(assets/images/video_thumbnails/how_it_works_video_thumb.png)'
        }

        return (
            <div id="landingPageComponent">

                <main>
                    <section id="home" className="home-banner">
                        <div className="effect"></div>
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-lg-10">
                                    <div className="hb-text">
                                        <h3>Start <b>engaging</b> with your customers.</h3>
                                        <p>Incentivize your customers for learning about your products, sparking engagement and knowledge you can measure. <b>Try it out for free today.</b></p>
                                    </div>
                                    
                                    <div className="hb-form">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <input value={this.state.emailValue} onChange={this.updateEmailValue} placeholder="email" className="form-control input-lg" />
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="password" value={this.state.passwordValue} onChange={this.updatePasswordValue} placeholder="password" className="form-control input-lg" />

                                                </div>
                                                <div className="col-md-4">
                                                    <input type="submit" className={this.state.buttonRestClassName} value="Create Account" />
                                                    <div className={this.state.buttonClickedClassName}><i className='fa fa-circle-o-notch fa-spin'></i> Creating Account</div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="about" className="section-top-up gray-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 m-15px-tb">
                                    <div className="feature-box">
                                        <div className="icon"><i className="fas fa-edit color-yellow"></i></div>
                                        <div className="feature-content">
                                            <h5>Create</h5>
                                            <p>Build out customizable, interactive videos. Upload your video and add questions throughout to measure customer understanding, request feedback, and track customer knowledge.</p>
                                            <div className="btn-bar"><a className="m-btn-icon theme-light" href="#"><i className="fa fa-chevron-right"></i></a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 m-15px-tb">
                                    <div className="feature-box">
                                        <div className="icon"><i className="fas fa-paper-plane color-blue"></i></div>
                                        <div className="feature-content">
                                            <h5>Engage</h5>
                                            <p>Connect with your customers by compensating them for learning about your products, providing feedback, or simply sharing their thoughts. The result is an ongoing engagement with your customers. </p>
                                            <div className="btn-bar"><a className="m-btn-icon theme-light" href="#"><i className="fa fa-chevron-right"></i></a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 m-15px-tb">
                                    <div className="feature-box">
                                        <div className="icon"><i className="fas fa-check-double color-green"></i></div>
                                        <div className="feature-content">
                                            <h5>Measure</h5>
                                            <p>Gaining contact-level visibility into your customer’s knowledge, makes it easy to measure the success of your messaging across your entire customer base.</p>
                                            <br />
                                            <div className="btn-bar"><a className="m-btn-icon theme-light" href="#"><i className="fa fa-chevron-right"></i></a> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="more-btn more-btn-bottom m-80px-t sm-m-40px-t"> <a className="m-btn m-btn-round m-btn-theme" href="#">Learn More</a> </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="feature" className="section effect-section">
                        <div className="effect-01 left"></div>
                        <div className="container">
                            <div className="row justify-content-center sm-m-45px-b m-60px-b">
                                <div className="col-lg-8 col-md-10">
                                    <div className="section-title text-center">
                                        <h2><small>Uniform, scalable, and documentable information sharing for your marketing, sales, and customer success teams.</small></h2> </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="side-feature sm-p-0px-r md-p-30px-r p-70px-r">
                                        <label className="theme-color">Improve Customer Communication</label>
                                        <h2>Create effective and efficient sales and customer success processes</h2>
                                        <p className="large">Dragonfly supplements your sales, and customer success processes freeing up teammates to focus on high-level customer interactions.</p>
                                        <hr className="m-25px-tb" />
                                        <ul className="list-type-01">
                                            <li>
                                                <div className="icon yellow"> <i className="fas fa-asterisk"></i> </div>
                                                <h6>Improve communication skills</h6> <a className="m-link" href="#">Learn more about <i className="fas fa-long-arrow-alt-right"></i></a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="side-feature sm-p-0px-l md-p-40px-l p-70px-l">
                                        <label className="theme-color">Build a database of customer knowledge</label>
                                        <h2>Make smarter business decisions with data analysis</h2>
                                        <p className="large">Dragonfly gives you the power to measure your messaging coverage and impact allowing you to see where you need to apply information to increase sales.</p>
                                        <br />
                                        <hr className="m-25px-tb" />
                                        <ul className="list-type-01">
                                            <li>
                                                <div className="icon blue"> <i className="fas fa-database"></i> </div>
                                                <h6>Faster Smarter</h6> <a className="m-link" href="#">Learn more about <i className="fas fa-long-arrow-alt-right"></i></a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="feature" className="section p-0px-b effect-section gray-bg">
                        <div className="bg-effect bg-cover bg-no-repeat gb-ef70 theme-bg"></div>
                        <div className="container">
                            <div className="row justify-content-center m-60px-b sm-m-40px-b">
                                <div className="col-lg-8 col-md-10">
                                    <div className="section-title text-center">
                                        <h2 className="white-color">What is incentivized information?</h2>
                                        <p className="white-color-light">Dragonfly incentivizes information engagement and allows you to measure company and product knowledge for each of your customers.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-12 col-lg-10">
                                    <div className="video-box bg-cover bg-no-repeat" style={videoThumbStyle}>
                                        <div className="video-area"> <a className="video-btn white popup-youtube" href="https://www.youtube.com/watch?v=Raj3NSc8Mjw"><span></span></a> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="how_it_works" className="section gray-bg">
                        <div className="container">
                            <div className="row justify-content-center sm-m-25px-b m-45px-b">
                                <div className="col-lg-8 col-md-10">
                                    <div className="section-title text-center">
                                        <h2>How Does Dragonfly Work?</h2>
                                        <p>Building a Dragonfly session is simple.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flow-section p-40px-t md-p-15px-t">
                                <div className="flow-row flow-row-1st">
                                    <div className="no-gutters row">
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-left">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fab fa-youtube"></i></div>
                                                    <h4>Upload Video</h4>
                                                    <p>Upload any type of video about your company or products.</p>
                                                    <br />
                                                    <br /> </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-left">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fas fa-question"></i></div>
                                                    <h4>Add Questions</h4>
                                                    <p>Add breakpoints anywhere you want throughout the video to ask any question you want about your video.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-left">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fas fa-address-book"></i></div>
                                                    <h4>Import Contacts</h4>
                                                    <p>Dragonfly allows you to import contacts by Excel or add contacts manually.</p>
                                                    <br /> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flow-row flow-row-2nd">
                                    <div className="no-gutters row">
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-right">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fas fa-clipboard-list"></i></div>
                                                    <h4>Create Campaigns</h4>
                                                    <p>Customize the opening and closing messaging, add your logo and specify your customer incentive amount.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-right">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fas fa-paper-plane"></i></div>
                                                    <h4>Send Your Dragonfly</h4>
                                                    <p>Paste your Dragonfly link anywhere you reach your customers such as text, email, or any social media platform.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="flow-col flow-col-right">
                                                <div className="flow-col-in">
                                                    <div className="icon"><i className="fas fa-chart-line"></i></div>
                                                    <h4>Measure Engagement</h4>
                                                    <p>Track which customers engage with which information so you can progressively build your messaging with them.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="price" className="section theme-bg">
                        <div className="container">
                            <div className="row justify-content-center sm-m-25px-b m-45px-b">
                                <div className="col-lg-8 col-md-10">
                                    <div className="section-title text-center">
                                        <h2 className="white-color">Risk-Free Pricing</h2>
                                        <p className="white-color-light">With dragonfly our risk-free pricing model ensures that you only pay for successfully completed dragonfly sessions</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 m-15px-tb">
                                    <div className="price-table-02">
                                        <div className="pt-head pt-white">
                                            <h6 className="text-white">Getting Started</h6>
                                            <div className="pt-price price-text-white-30"> <span></span>Free </div>
                                        </div>
                                        <div className="pt-body">
                                            <ul>
                                                <li className="white-color-light">Create Your Account</li>
                                                <li className="white-color-light">Create Unlimited Dragonflies</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 m-15px-tb">
                                    <div className="price-table-02 active">
                                        <div className="pt-head">
                                            <h6>Using Dragonfly</h6>
                                            <div className="pt-price"> Risk Free </div>
                                        </div>
                                        <div className="pt-body">
                                            <ul>
                                                <li>Only pay for <b className="text-primary text-uppercase">successfully completed</b> Dragonfly sessions</li>
                                            </ul>
                                            <ul>
                                                <br />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 m-15px-tb">
                                    <div className="price-table-02">
                                        <div className="pt-head">
                                            <h6 className="text-white">Final Cost</h6>
                                            <div className="pt-price text-white font-24"> <small>Customer Incentive + Success Fee</small> </div>
                                        </div>
                                        <div className="pt-body">
                                            <ul>
                                                <li className="white-color-light">Success Fee is 33% of paid incentives</li>
                                                <li className="white-color-light">Decreases with volume commitment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="get_started" className="section section-get-started theme-bg">
                        <div className="container">
                            <div className="row justify-content-center sm-m-25px-b m-45px-b">
                                <div className="col-lg-8 col-md-10">
                                    <div className="section-title text-center">
                                        <h2 className="white-color">Get started by creating a free account today.</h2> </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-9 col-lg-7">
                                    <div className="create-account-form">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <input name="email" className="form-control" placeholder="Email Address" type="email" /> </div>
                                                <div className="col-md-4">
                                                    <input name="password" className="form-control" placeholder="Password" type="password" /> </div>
                                                <div className="col-md-4">
                                                    <button className="m-btn m-btn-theme">Create Account</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="footer-one">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-sm-6 m-15px-tb">
                                    <div className="footer-about">
                                        <div className="fot-logo">
                                            <a href="#"> <img src="assets/images/logos/logo-full-trans.png" title="" alt="" /> </a>
                                        </div>
                                        <p>Creating engagement with your customers.</p>
                                        <ul className="fot-icon">
                                            <li><a href="https://www.facebook.com/DragonflyIncentivizedInformation/" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="https://twitter.com/dragonfly_one" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="https://www.linkedin.com/company/dragonfly-incentivized-information" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-1 col-sm-6 m-15px-tb"> </div>
                                <div className="col-lg-5 col-sm-6 m-15px-tb">
                                    <div className="footer-link">
                                        <h5 className="fot-title">Site Links</h5>
                                        <ul>
                                            <li><a href="#home">Home</a></li>
                                            <li><a href="#about">About</a></li>
                                            <li><a href="#feature">Applications</a></li>
                                            <li><a href="#how_it_works">How it Works?</a></li>
                                            <li><a href="#price">Pricing</a></li>
                                            <li><a href="#get_started">Get Started</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 m-15px-tb">
                                    <div className="footer-info">
                                        <h5 className="fot-title">Contact Us</h5> <address> <p>528 N 12th St.</p><p>San Jose, CA</p><p>95112</p><br /> <p className="email"><a href="mailto:admin@dragonfly.one">admin@dragonfly.one</a></p><p className="call"><a href="tel:408-212-6062">408-212-6062</a></p></address> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-left">
                                    <p>© 2019 Dragonfly Incentivized Information, LLC. All Rights Reserved</p>
                                </div>
                                <div className="col-md-6 text-center text-md-right">
                                    <ul>
                                        <li><a href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>


            </div>
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
            mixpanel.identify(email);
            mixpanel.people.set({
                "$email": email,
                "$created": new Date()
            });
            mixpanel.track("Creates Account");
            cognitoUser = result.user;
            myThis.props.handleLoadEmail(email);
            myThis.props.history.push('confirmregistration');
        });
    }

}

export default LandingPageComponent;
