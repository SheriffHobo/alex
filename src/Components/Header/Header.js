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
                    props.firstName
                        ?   <>
                                <div className="Header-text2" >
                                    {'Hi, ' + props.firstName + ' '}
                                    <span onClick={props.logOut} >
                                        <Link to={'/login'} className="Link">
                                            <img src="pictures/logouticon.png" id="logouticon" className="noselect" alt="logout" />
                                        </Link>
                                    </span>
                                </div>
                            </>
                        :   <div className="Header-text">
                                <Link to={'/login'} className="Link">Login | </Link>
                                <Link to={'/signup'} className="Link"> Sign Up</Link>
                            </div>
                }

            </div>
        </header>
    )
});

export default Header;