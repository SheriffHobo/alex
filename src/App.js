import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import getCookie from './Components/cookies/cookies';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Splash from './Components/Splash/Splash';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import API from './API/API';

function App() {
  const [ username, setUsername ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);

  // example credentials
	// 	email: 'jack@email.com'
	// 	password: '4RGYLE$sw3ater'
  
  const logIn = (credentials = {}) => {
    if (!(credentials.email && credentials.password)) return alert('please enter your email and password');
    
    API.login(credentials)
      .then(result => console.log(result))
      .catch(err => console.error(err));
  };

  const signUp = (user) => {
    API.signUp(user)
      .then(result => console.log(result))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    // API call for login
    
    M.AutoInit();

    // setTimeout(() => setLoggedIn(true), 2000);

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
                loggedIn
                  ? Home
                  : Splash
              }
            />
          </Switch>
        </div>

        {
          loggedIn
            ? <Footer />
            : <div className="Footer-fixed" />
        }

      </div>

    </BrowserRouter>
  );
}

export default App;
