import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { setCookies } from './API/cookies';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Splash from './Components/Splash/Splash';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import NewShelf from './Components/NewShelf/NewShelf';
import Search from './Components/Search/Search';
// import Chat from './Components/Chat/Chat';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import API from './API/API';

function App() {
  const [ firstName, setFirstName ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ showSplash, setShowSplash ] = useState(true);

  useEffect(() => {    
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    M.AutoInit();

    // any other pre-login startup code goes here

    // need valid token to make splash go away
    API.loginWithToken()
      .then(result => completeLogIn(result))
      .catch(err => console.error(err));
  }, []);

  const logIn = (credentials = {}) => {
    if (!(credentials.email && credentials.password)) {
      return alert('Please enter your email and password');
    };
    
    API.login(credentials)
      .then(result => completeLogIn(result))
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

  function completeLogIn(result) {
    console.log(result)
    if (result.message) alert(result.message);

    if (result.token && result.firstName) {
      const cookies = {
        token: result.token,
        firstName: result.firstName,
      };

      setCookies(cookies);
    };

    setFirstName(result.firstName);
    setLoggedIn(true);
  }

  const leaveSplash = loggedIn && !showSplash;
  // REDIRECT WOULD GO HERE if leaveSplash, redirect to /me
  // except App wouldn't render

  return (
    <BrowserRouter>

      <div className="App">
        <div className="content">
          <Header loggedIn={loggedIn} logOut={logOut} firstName={firstName} />

          <Switch>
            <Route path="/me" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/newshelf" exact component={NewShelf} />
            {/* <Route path="/chat" exact component={Chat} /> */}
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
