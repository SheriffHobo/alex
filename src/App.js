import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: 'Oh Hi There',
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.message}</h1>
        </header>
      </div>
    );
  }
}

export default App;
