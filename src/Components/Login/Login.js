import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./Style.css"

const Login = React.memo(props => {
  
  //hey! Do you have live sshare audio? If so we can avoid having to run another app to communicate.
  


	return (

  <main className="valign-wrapper">
      <div classNameName="container">
        <div classNameName="row">
          <center>
            <form method="post">
              <div className='row'>
                <div className='input-field'>
                  <input className='validate' type='email' name='email' id='email' />
                  <label for='email'>Enter your email</label>
                </div>
                <div className='input-field'>
                  <input className='validate' type='password' name='password' id='password' />
                  <label for='password'>Enter your password</label>
                </div>
                  <button type='submit' name='btn_login' className='btn_login btn-small'><Link to="/#">Login</Link></button>
                  <button type='submit' name='btn_create' className='btn_create btn-small'><Link to="/#">Create Account</Link></button>
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