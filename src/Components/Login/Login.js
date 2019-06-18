import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginStyle.css"

const Login = React.memo(props => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

	return (
		<main id="main" className="valign-wrapper">
			<div className="container align-center">
				<div className="row">
          <center>
            <form className="valign-wrapper" method="post">
              <div className='row'>

                <div className='input-field'>
                  <input
                    className='validate'
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label for='email'>Enter your email</label>
                </div>

                <div className='input-field'>
                  <input
                    className='validate'
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label for='password'>Enter your password</label>
                </div>

                <button
                  type='submit'
                  name='btn_login'
                  className='btn_login btn-small'
                  onClick={e => {
                    e.preventDefault();
                    props.logIn({ email, password });
                  }}
                >
                  Login
                </button>

                <button
                  type='submit'
                  name='btn_forgot'
                  className='btn_forgot btn-small'
                >
                  <Link to="/#">Forgot Password?</Link>
                </button>

              </div>
            </form> 
          </center>
				</div>
			</div>
		</main>
	);
});

export default Login;