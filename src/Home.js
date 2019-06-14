import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      message: 'Oh hai yall',
    };
  }

  componentDidMount() {
    // API call for login
    // if token present, login automatically
    // populate state with user's shelves, send down as prop(s)
    // otherwise, go to login page

  }
  
  render() {
    return(
      <div className="Home">
        <header>
          <h1>{this.state.message}</h1>
          <Link to={'/'}>
            <h3>Home</h3>
          </Link>
        </header>
      </div>
    );
  }  
};

export default Home;