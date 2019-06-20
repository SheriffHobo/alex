import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./FooterStyle.css";

class Footer extends Component {

  render() {
    return (
      <div className="Footer-fixed">
        <div id="footnav">
          <div>
          <i className="noselect small material-icons dropdown-trigger" href='#' data-target='dropdown1'>menu</i>
            <ul id='dropdown1' className='dropdown-content'>
              <li><Link to="/#">Activity Feed</Link></li>
              <li><Link to="/#">Liked Shelves</Link></li>
              <li><Link to="/#">Discover</Link></li>
              <li className="divider" tabIndex="-1"></li>
              <li><Link to="/#">Account</Link></li>
              <li className="divider" tabIndex="-1"></li>
              <li><Link to="/#">Terms</Link></li>
              <li><Link to="/#">About</Link></li>
            </ul>
          <i className="noselect small material-icons">home<Link to="/#"></Link></i>
          <i className="noselect small material-icons">chat<Link to="/#"></Link></i>
          </div>
            {/* <div>
            <i className="noselect small material-icons search">search</i>
            </div> */}
            <div>
            <i className="noselect small material-icons">search</i>
            <input id="search" type="search" placeholder="Begin Typing to Search" required></input>
            </div>
        </div>
      </div>
    );
  };
};

export default Footer;