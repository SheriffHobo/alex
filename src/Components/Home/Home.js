import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ShelfButton from '../ShelfButton/ShelfButton';
import "./HomeStyle.css"

class Home extends Component {
  render() {
    return(
      <div className="Home">
        <div className="shelfbtnlist">
          <ShelfButton />
        </div>
      </div>
    );
  };
};

export default Home;