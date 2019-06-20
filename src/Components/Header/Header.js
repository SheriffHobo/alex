import React from 'react';
import { Link } from "react-router-dom";
import "./HeaderStyle.css";

const Header = React.memo(props => {
  return (
    <header className="Header">
      
      <div id="headnav">

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
          props.firstName
            ? <>
                <div className="Header-text">{'Hi, ' + props.firstName + ' '}</div>
                <span onClick={props.logOut}>| Logout</span>
              </>
            : <div className="Header-text">
                <Link to={'/login'} className="Link">Login | </Link>
                <Link to={'/signup'} className="Link">Sign Up</Link>
                <span onClick={props.logOut}>| Logout</span>
              </div>
        }

      </div>

    </header>
  )
});

export default Header;