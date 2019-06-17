import React from 'react';
import "./Style.css";

const Splash = React.memo(props => {
	return (
		
		<div id="splash">
			<img src="../AlexBook.png" alt=""></img>
			<p>What's in your Library?</p>
		</div>
		
	);
});

export default Splash;