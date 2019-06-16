import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import getCookie from './cookies';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Splash from './Splash';
import Login from './Login';
import SignUp from './SignUp';
import './App.css';

function App() {
  const [ username, setUsername ] = useState('');

  useEffect(() => {
    // API call for login
    setTimeout(() => setUsername('jack'), 2000)

    if (document.cookie) {
      // if token present in cookies, try to GET my shelves
      // if that's successful, setLoggedIn(true)
      // populate state with user's shelves, send down as prop(s)
    }

  }, []);

  return (
    <BrowserRouter>

      <div className="App">
        <div className="content">
          <Header username={username} />

          <Switch>
            <Route path="/me" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route
              component={
                username
                  ? Home
                  : Splash
              }
            />
          </Switch>
        </div>

        <Footer />

      </div>

      <div className="Footer-fixed">
        {
          username
            ? 'search and stuff'
            : 'empty since ur not logged in'
        }
      </div>

    </BrowserRouter>
  );
}

export default App;
