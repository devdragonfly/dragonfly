import React from 'react';

export default class LogoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.getLogoImg = this.getLogoImg.bind(this);
  }

  getLogoImg() {
    if (this.props.dragonfly.hasOwnProperty('logoId')) {
      return "https://s3-us-west-2.amazonaws.com/dragonfly-logos/" + this.props.dragonfly.logoId;
    }
    return "./images/logo-dragonfly-ii2.png";
  }

  render() {
    return (
      <img src={this.getLogoImg()} className="divLeft" />
    );
  };

}