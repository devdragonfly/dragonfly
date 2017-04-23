import React from 'react';
import {render} from 'react-dom';
import SignUpComponent from './SignUpComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello Dragonfly!</p>
        <SignUpComponent />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));