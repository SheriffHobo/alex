import React from 'react';

const Splash = React.memo(props => {
	return (
		<div>
			<h1>Welcome to Alexandria</h1>
			<h2>What's in your Library?</h2>
			<p>Login or sign up to store and share your collections.</p> 
		</div>
	);
});

export default Splash;