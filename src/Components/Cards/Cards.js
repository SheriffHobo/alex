import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./CardStyle.css";

class Card extends Component {

  render() {
    return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">
                        <div className="card-image">
                          <img className="custom" src="/pictures/Damon/IMG_0858.jpg"></img>
                          {/* OR */}
                          {/* DIV that holds the user uploaded picture */}

                          {/* maybe an overlay? */}
                          <span className="card-title">THIS SHOULD BE THE ITEM NAME</span>

                          {/* THIS ICON IS A BUTTON TO ADD TO YOUR PERSONAL SHELF */}
                          <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>

                          {/* THIS BUTTON IS THE LIKE BUTTON */}
                          <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                        </div>

                        <div className="card-content">
                          --YEAR
                          --DESC
                          --COUNT
                        </div>

                        <div className="card-action">
                          <a href="/" rel="nofollow noopener noreferrer">See this on the web</a>
                        </div>

                    </div>
                </div>
            </div>
    );
  };
};

export default Card;