import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./FooterStyle.css";

class Footer extends Component {

  render() {
    return (
      <div className="Footer-fixed">
          <i id="menubtn" className="menu-btn noselect small material-icons dropdown-trigger" href='#' data-target='dropdown1'>menu</i>
            <ul id='dropdown1' className='dropdown-content'>
              <li><Link to="/#">Activity Feed</Link></li>
              <li><Link to="/#">Liked Shelves</Link></li>
              <li><Link to="/#">Discover</Link></li>
              <li className="divider" tabindex="-1"></li>
              <li><Link to="/#">Account</Link></li>
              <li className="divider" tabindex="-1"></li>
              <li><Link to="/#">Terms</Link></li>
              <li><Link to="/#">About</Link></li>
            </ul>
          <i id="homebtn" className="home-btn noselect small material-icons"><Link to="/#">home</Link></i>
          <i id="chatbtn" className="chat-btn noselect small material-icons"><Link to="/#">chat</Link></i>
      </div>
    );
  };
};

export default Footer;