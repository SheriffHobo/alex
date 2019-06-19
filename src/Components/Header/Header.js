import React from 'react';
import { Link } from "react-router-dom";
import "./HeaderStyle.css";

const Header = React.memo(props => {
  return (
    <header className="Header">
      
      <row id="headnav">

        <div className="Header-text">
          <Link to={'/'} className="Link">
            <h5>Alexandria</h5>
          </Link>
        </div>

        {
          props.loggedIn
            ? <div className="add-btn noselect">
                    <i id="newshelfbtn" className="small material-icons">add_circle</i>
              </div>
            : <div /> 
        }

        {
          props.username
            ? <div className="Header-text">Hi, ' + props.username</div>
            : <div className="Header-text">
                <Link to={'/login'} className="Link">Login | </Link>
                <Link to={'/signup'} className="Link">Sign Up</Link>
              </div>
        }

      </row>

    </header>
  )
});

export default Header;