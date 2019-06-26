import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./ShelfButtonStyle.css";
import M from 'materialize-css';
import Card from '../Card/Card'

class ShelfButton extends Component {

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
    }

  render() {
    return (
        <div className="shelfbutton">
            <div className="row">
                
                <div className="col xl2">
                    {/* Thumbnail of first image on shelf 39x39 size OR... */}
                    <img src="/pictures/stampicon.png" id="stamp" alt="stampicon" ></img>
                </div>
                <div className="col xl8">
                    <h6 className="shelftitle">-25- Character Titles</h6>
                </div>
                <div className="col xl2">
                    <i className="material-icons dropdownarrow dropdown-trigger" href='#' data-target='dropdown2' data-activates='dropdown2'>arrow_drop_down</i>
                </div>

                <div id='dropdown2' className='dropdown-content'>

                </div>

            </div>

        </div>
    );
  };
};

export default ShelfButton;