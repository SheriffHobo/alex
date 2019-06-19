import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import getCookie from './API/cookies';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Splash from './Components/Splash/Splash';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NewShelf from './Components/NewShelf/NewShelf';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import API from './API/API';

function App() {
  const [ username, setUsername ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ showSplash, setShowSplash ] = useState(true);

  // example credentials
	// 	email: 'jack@email.com'
	// 	password: '4RGYLE$sw3ater'
  

  const logIn = (credentials = {}) => {
    if (!(credentials.email && credentials.password)) {
      return alert('please enter your email and password');
    };
    
    API.login(credentials)
      .then(result => {
        setUsername(result.username);
        setLoggedIn(true);
      })
      .catch(err => console.error(err));
  };


  const signUp = (user) => {
    API.signUp(user)
      .then(result => {
        setUsername(result.username);
        setLoggedIn(true);
      })
      .catch(err => console.error(err));
  }


  useEffect(() => {
    M.AutoInit();
    setTimeout(() => setShowSplash(true), 2750);

    // any other pre-login startup code goes here

    // log in if there's a valid token
    const token = getCookie('token');
    if (!token) return;

    API.loginWithToken(token)
      .then(result => {
        setUsername(result.username);
        setLoggedIn(true);
      })
      .catch(err => console.error(err));
  }, []);

  const leaveSplash = loggedIn && showSplash;
  
  return (
    <BrowserRouter>

      <div className="App">
        <div className="content">
          <Header loggedIn={loggedIn} username={username} />

          <Switch>
            <Route path="/me" exact component={Home} />
            <Route
              path="/login"
              exact
              render={() => <Login logIn={logIn} />}
            />
            <Route
              path="/signup"
              exact
              render={() => <SignUp signUp={signUp} />}
            />
            <Route
              component={
                leaveSplash
                  ? Home
                  : Splash
              }
            />
          </Switch>
        </div>

        {
          leaveSplash
            ? <Footer />
            : <div className="Footer-fixed" />
        }

      </div>

    </BrowserRouter>
  );
}

export default App;
