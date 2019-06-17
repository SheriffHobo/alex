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

function App() {
  const [ username, setUsername ] = useState('');

  useEffect(() => {
    // API call for login
    M.AutoInit();

    setTimeout(() => setUsername(''), 2000);

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

        {
          username
            ? <Footer />
            : <div className="Footer-fixed" />
        }

      </div>

    </BrowserRouter>
  );
}

export default App;
