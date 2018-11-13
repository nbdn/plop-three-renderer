import React, { Component } from 'react';
import './App.css';

import Renderer from "./Renderer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Renderer modelPath={"./models/geometry.json"} />
      </div>
    );
  }
}

export default App;
