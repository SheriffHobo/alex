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
                        <img src="THIS IS WHAT IS PULLED IN FROM THE API CALL"></img>
                        <span className="card-title">THIS SHOULD BE THE ITEM NAME</span>
                        {/* THIS ICON IS A BUTTON TO ADD TO YOUR PERSONAL SHELF */}
                        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                        {/* THIS BUTTON IS THE LIKE BUTTON */}
                        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                        </div>

                        <div className="card-content">
                        --YEAR
                        --DESC
                        --COUNT
                        </div>

                        <div className="card-action">
                        <a href="#">TO THE API SOURCE ENTRY?</a>
                        </div>

                    </div>
                </div>
            </div>
    );
  };
};

export default Card;