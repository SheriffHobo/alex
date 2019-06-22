import React from 'react';
import "./SplashStyle.css";

const Splash = React.memo(props => {
	return (
		
		<div id="splash">
			<img src="../pictures/AlexBook.png" alt=""></img>
			<p>What's in your Library?</p>
		</div>
		
	);
});

export default Splash;