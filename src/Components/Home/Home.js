import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import ShelfButton from '../ShelfButton/ShelfButton';

class Home extends Component {

//  const Home = React.memo(props => {
    render() {
    return(
      <div className="Home">

        <ShelfButton />
        <ShelfButton />
        <ShelfButton />
        <ShelfButton />
        
      </div>
    );
  };

};

export default Home;