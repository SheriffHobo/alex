import React from 'react';
import { Link } from "react-router-dom";
import "./Style.css";

const Header = React.memo(props => {
  return (
    <header className="Header">
      
      <div className="Header-text">
        <Link to={'/'} className="Link">
          <h5 className="Header-appName">Alexandria</h5>
        </Link>
      </div>

    {
      props.username
        ? <div className="add-btn noselect">
                <i id="newshelfbtn" class="small material-icons">add_circle</i>
          </div>
        : <div /> 
    }

      <div className="Header-text" style={{ textAlign: 'right' }} >
        {
          props.username
            ? 'Hi, ' + props.username
            : <div>
                <Link to={'/login'} className="Link">Login | </Link>
                <Link to={'/signup'} className="Link">Sign Up</Link>
              </div>
        }
      </div>

    </header>
  )
});

export default Header;