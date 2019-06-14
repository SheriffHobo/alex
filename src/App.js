import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route component={Home} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
