import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./ShelfButtonStyle.css";

class ShelfButton extends Component {

  render() {
    return (
        <div className="shelfbutton">
            <div>
                {/* Thumbnail of first image on shelf 39x39 size OR... */}
                <i className="material-icons col defaulticon">photo_album</i>
            </div>
            <div>
                <h6 className="shelftitle col">Limit Titles to 30 _Characters</h6>
            </div>
            <div>
                <i className="material-icons hearticonnotliked col">favorite_border</i>
            </div>
        </div>
    );
  };
};

export default ShelfButton;