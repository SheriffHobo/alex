import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import ShelfButton from '../ShelfButton/ShelfButton';
import "./HomeStyle.css"

class Home extends Component {

//  const Home = React.memo(props => {
    render() {
    return(
      <div className="Home">
        <div className="shelfbtnlist">
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
          <ShelfButton />
        </div>
      </div>
    );
  };

};

export default Home;