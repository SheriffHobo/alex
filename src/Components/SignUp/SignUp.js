import React, { useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import "./SignUpStyle.css";

const SignUp = React.memo(props => {
	const [ redirect, setRedirect ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ confEmail, setConfEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confPassword, setConfPassword ] = useState('');
	const [ country, setCountry ] = useState('');
	const [ province, setProvince ] = useState('');
	const [ city, setCity ] = useState('');

	if (redirect) return <Redirect to='/' />;

	return (
		<main className="signup">
			<div className="container align-center">
				<center>
					<form method="post" id="signupform">
						<div className='row'>

							<div className='input-field'>
								<input
									type='text'
									name='firstname'
									id='firstname'
									value={firstName}
									onChange={e => setFirstName(e.target.value)}
								/>
								<label htmlFor='firstname' className="noselect">
									First Name
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='text'
									name='lastname'
									id='lastname'
									value={lastName}
									onChange={e => setLastName(e.target.value)}
								/>
								<label htmlFor='lastname' className="noselect">
									Last Name
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='email'
									name='email'
									id='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<label htmlFor='email' className="noselect">
									Enter your email
								</label>
							</div>
							
							<div className='input-field'>
								<input
									className='validate'
									type='email'
									name='confemail'
									id='confemail'
									value={confEmail}
									onChange={e => setConfEmail(e.target.value)}
								/>
								<label htmlFor='confemail' className="noselect">
									Confirm Email
								</label>
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
								<label htmlFor='password' className="noselect">
									Enter your password
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='password'
									name='confpassword'
									id='confpassword'
									value={confPassword}
									onChange={e => setConfPassword(e.target.value)}
								/>
								<label htmlFor='confpassword' className="noselect">
									Confirm password
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='text'
									name='country'
									id='country'
									value={country}
									onChange={e => setCountry(e.target.value)}
								/>
								<label htmlFor='country' className="noselect">
									Country
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='text'
									name='province'
									id='province'
									value={province}
									onChange={e => setProvince(e.target.value)}
								/>
								<label htmlFor='province' className="noselect">
									State / Province
								</label>
							</div>

							<div className='input-field'>
								<input
									className='validate'
									type='text'
									name='city'
									id='city'
									value={city}
									onChange={e => setCity(e.target.value)}
								/>
								<label htmlFor='city' className="noselect">
									City
								</label>
							</div>

							<button
								type='submit'
								name='btn_create'
								className='btn_login btn-small waves-effect waves-light'
								onClick={e => {
									e.preventDefault();

									props.signUp({
										firstName,
									lastName,
									email,
									password,
									country,
									province,
									city,
									});

									setRedirect(true);
								}}
							>
								<Link to="/me">Create Account</Link>
							</button>

						</div>
					</form>
				</center>
			</div>
		</main>
	);
});

export default SignUp;