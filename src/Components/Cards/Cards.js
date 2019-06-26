import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./CardStyle.css";

class Card extends Component {

  render() {
    return (
      <div className="row">
        <div className="">
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="/pictures/Damon/IMG_0858.jpg"></img>
            </div>
            <div class="card-content">
              <span class="card-title activator">Cthulhu<i class="material-icons right">more_vert</i></span>
              <div className="cardbtns">
                <span class=""><i class="material-icons small" alt="See this on the web">exit_to_app</i></span>
                <span class=""><i class="material-icons small" alt="Add to one of your Shelves">add_circle</i></span>
                <span class=""><i class="material-icons small" alt="Add to Wishlist">bookmark</i></span>
              </div>
            </div>
            <div class="card-reveal">
              <span class="card-title">Cthulhu<i class="material-icons small right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>
        </div>           
      </div>
    );
  };
};

export default Card;