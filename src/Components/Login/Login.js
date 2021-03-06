import React, { useState } from 'react';
import { Link, BrowserRouter, Redirect } from "react-router-dom";
import "./LoginStyle.css"

const Login = React.memo(props => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  if (props.loggedIn) {
    return <BrowserRouter><Redirect to='/me' /></BrowserRouter>
  }

  return (
    <main className="valign-wrapper login">
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
                  <label htmlFor='email'>Enter your Email</label>
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
                  <label htmlFor='password'>Enter your Password</label>
                </div>

                <Link to="/me">
                  <button
                    type='submit'
                    name='btn_login'
                    className='btn_login btn-small waves-effect waves-light'
                    onClick={e => {
                      e.preventDefault();
                      props.logIn({ email, password });
                    }}
                  >
                    <Link to="/me">Login</Link>
                  </button>
                </Link>

                {/* <button
                  type='submit'
                  name='btn_forgot'
                  className='btn_forgot btn-small waves-effect waves-light'
                >
                  <Link to="/#">Forgot Password?</Link>
                </button> */}

              </div>
            </form>
          </center>
        </div>
      </div>
    </main>
  );
});

export default Login;