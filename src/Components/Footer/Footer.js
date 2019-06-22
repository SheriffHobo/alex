import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import M from 'materialize-css';
import "./FooterStyle.css";

class Footer extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
}

  render() {
    return (
      <div className="Footer-fixed">
        <div id="footnav">
            <i className="noselect small material-icons dropdown-trigger" href='#' data-target='dropdown1' data-activates='dropdown1'>menu</i>
              <ul id='dropdown1' className='dropdown-content z-depth-5'>
                <li><Link to="/favusers">Favorite Users</Link></li>
                <li><Link to="/favshelves">Favorite Shelves</Link></li>
                <li><Link to="/activity">Favorite User Feed</Link></li>
                <li><Link to="/discover">Discover</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/account">Account Settings</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/about">About Alexandria</Link></li>
              </ul>
              <Link to="/me"><i className="noselect small material-icons">home</i></Link>
              <Link to="/#"><i className="noselect small material-icons">add_circle</i></Link>
              <Link to="/#"><i className="noselect small material-icons">chat</i></Link>
              <Link to="/search"><i className="noselect small material-icons">search</i></Link>
        </div>
      </div>
    );
  };
};

export default Footer;