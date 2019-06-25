import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ShelfButton from '../ShelfButton/ShelfButton';
import UserSearchTest from '../UserSearchTest';
import APISearch from '../APISearch';
import "./HomeStyle.css"

class Home extends Component {
  render() {
    return(
      <div className="Home">
        <div className="shelfbtnlist">
          <ShelfButton />
          <UserSearchTest />
          <APISearch />
        </div>
      </div>
    );
  };
};

export default Home;