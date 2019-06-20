import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
  const [ firstName, setFirstName ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ showSplash, setShowSplash ] = useState(true);

  const logIn = (credentials = {}) => {
    if (!(credentials.email && credentials.password)) {
      return alert('please enter your email and password');
    };
    
    API.login(credentials)
      .then(result => {
        if (result.token && result.firstName) {
          document.cookie = `token=${result.token};`;
          document.cookie = `firstName=${result.firstName};`;
        };

        completeLogIn(result);
      })
      .catch(err => console.error(err));
  };

  const signUp = user => {
    API.signUp(user)
      .then(result => completeLogIn(result))
      .catch(err => console.error(err));
  };

  const logOut = () => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie = "firstName=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
    document.location.reload(false);
  };

  useEffect(() => {    
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    M.AutoInit();

    // any other pre-login startup code goes here

    // log in if there's a valid token
    const token = getCookie('token');
    if (!token || token === 'undefined') return;

    const firstName = getCookie('firstName');
    if (!firstName || firstName === 'undefined') return;

    API.loginWithToken(token)
      .then(result => {
        completeLogIn({ firstName, message: result.message });
      })
      .catch(err => console.error(err));
  }, []);

  function completeLogIn(result) {
    if (result.message) alert(result.message);

    setFirstName(result.firstName);
    setLoggedIn(true);
  }

  const leaveSplash = loggedIn && !showSplash;

  return (
    <BrowserRouter>

      <div className="App">
        <div className="content">
          <Header loggedIn={loggedIn} logOut={logOut} firstName={firstName} />

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
