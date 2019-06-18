import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./ShelfButtonStyle.css";

class ShelfButton extends Component {

  render() {
    return (
        <div className="shelfbutton">
            <div className="row">
                <div className="col xl2">
                    {/* Thumbnail of first image on shelf 39x39 size OR... */}
                    <i className="material-icons defaulticon">photo_album</i>
                </div>
                <div className="col xl8">
                    <h6 className="shelftitle">-25- Character Titles</h6>
                </div>
                <div className="col xl2">
                    <i className="material-icons hearticonnotliked">favorite_border</i>
                </div>
            </div>
        </div>
    );
  };
};

export default ShelfButton;