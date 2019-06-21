import React, { useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import "./SignUpStyle.css";

const SignUp = React.memo(props => {
	const [ redirect, setRedirect ] = useState(false);
	const [ firstName, setFirstName ] = useState('Albert');
	const [ lastName, setLastName ] = useState('Einstein');
	const [ email, setEmail ] = useState('Albert@hello.world');
	const [ confEmail, setConfEmail ] = useState('Albert@hello.world');
	const [ password, setPassword ] = useState('123@$ABCdef');
	const [ confPassword, setConfPassword ] = useState('123@$ABCdef');
	const [ country, setCountry ] = useState('United States');
	const [ province, setProvince ] = useState('New Jersey');
	const [ city, setCity ] = useState('Princeton');

	if (redirect) return <Redirect to='/' />;

	return (
		<main className="valign-wrapper">
			<div className="container align-center">
				<div className="row">
					<center>
						<form className="valign-wrapper" method="post">
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
									className='btn_login btn-small'
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
			</div>
		</main>
	);
});

export default SignUp;