import React from 'react';
import { Link } from "react-router-dom";
import "./LoginStyle.css"

const Login = React.memo(props => {
	return (
  <main id="main" className="valign-wrapper">
      <div className="container align-center">
        <div className="row">
          <center>
            <form className="valign-wrapper" method="post">
              <div className='row'>
                <div className='input-field'>
                  <input className='validate' type='email' name='email' id='email' />
                  <label className='lable1' for='email'>Enter your email</label>
                </div>
                <div className='input-field'>
                  <input className='validate' type='password' name='password' id='password' />
                  <label for='password'>Enter your password</label>
                </div>
                  <button type='submit' name='btn_login' className='btn_login btn-small'><Link to="/me">Login</Link></button>
                  <button type='submit' name='btn_forgot' className='btn_forgot btn-small'><Link to="/#">Forgot Password?</Link></button>
              </div>
            </form> 
          </center>
        </div>
      </div>
  </main>
	);
});

export default Login;