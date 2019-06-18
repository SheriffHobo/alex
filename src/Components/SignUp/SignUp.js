import React from 'react';
import { Link } from "react-router-dom";
import "./SignUpStyle.css";

const SignUp = React.memo(props => {
	return (
	<main className="valign-wrapper">
		<div className="container align-center">
			<div className="row">
			<center>
				<form className="valign-wrapper" method="post">
				<div className='row'>

					<div className='input-field'>
						<input  type='text' name='firstname' id='firstname' />
						<label for='firstname'>First Name</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='text' name='lasttname' id='lastname' />
						<label for='lastname'>Last Name</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='email' name='email' id='email' />
						<label for='email'>Enter your email</label>
					</div>
					
					<div className='input-field'>
						<input className='validate' type='email' name='confemail' id='confemail' />
						<label for='confemail'>Confirm Email</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='password' name='password' id='password' />
						<label for='password'>Enter your password</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='password' name='confpassword' id='confpassword' />
						<label for='confpassword'>Confirm password</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='text' name='country' id='country' />
						<label for='country'>Country</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='text' name='providencestate' id='providencestate' />
						<label for='providencestate'>Provence / State</label>
					</div>

					<div className='input-field'>
						<input className='validate' type='text' name='city' id='city' />
						<label for='city'>City</label>
					</div>

					<button type='submit' name='btn_create' className='btn_login btn-small'><Link to="/me">Create Account</Link></button>
				</div>
				</form>
			</center>
			</div>
		</div>
	</main>
	);
});

export default SignUp;