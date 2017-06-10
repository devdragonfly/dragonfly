import React from 'react';


class StarsComponent extends React.Component {

  constructor(props) {
    super(props);
    var count = props.count;
    var starsArray = this.getStarsArray(count);
    this.state = {starsArray: starsArray};
    this.getStarsArray = this.getStarsArray.bind(this);
    this.handleStarClicked = this.handleStarClicked.bind(this);
    
  }

  render() {
    
    var starsArray = this.state.starsArray;
    var handleStarClicked = this.handleStarClicked;
    var starsJsx = starsArray.map((starValue, i) => {
                return <Star star={i} starValue={starValue} handleStarClicked={handleStarClicked} />
        });
    
    return (
        <div className="dragon-stars">
          {starsJsx}
        </div>
    );
  }
  
  getStarsArray(count) {
    var starsArray = [0, 0, 0, 0, 0]
    if (count >= 0.5) starsArray[0] = 0.5;
    if (count >= 1.0) starsArray[0] = 1.0;
    if (count >= 1.5) starsArray[1] = 0.5;
    if (count >= 2.0) starsArray[1] = 1.0;
    if (count >= 2.5) starsArray[2] = 0.5;
    if (count >= 3.0) starsArray[2] = 1.0;
    if (count >= 3.5) starsArray[3] = 0.5;
    if (count >= 4.0) starsArray[3] = 1.0;
    if (count >= 4.5) starsArray[4] = 0.5;
    if (count >= 5.0) starsArray[4] = 1.0;
    return starsArray;
  }
  
  handleStarClicked(star) {
    var starsArray = this.state.starsArray;
    var prevStarValue = starsArray[star];
    var newStarValue = 1;
    if (prevStarValue === 1) newStarValue = 0.5;
    var count = star + newStarValue;
    var newStarsArray = this.getStarsArray(count);
    this.setState({
      starsArray: newStarsArray
    });    
  }


}





class Star extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    
    var starValue = this.props.starValue;
    var starClassName = "fa fa-star-o";
    if (starValue === 0.5) starClassName = "fa fa-star-half-o";
    if (starValue === 1) starClassName = "fa fa-star";

    return (
        <i className={starClassName} onClick={this.handleStarClicked.bind(this, this.props.star)}></i>
    );
  }

  handleStarClicked(star) {
    this.props.handleStarClicked(star);
  }

}





export default StarsComponent;