import React from 'react';
import "./Style.css";

const Splash = React.memo(props => {
	return (
		<div id="splash">
			<img class="responsive-img" src="AlexBook.png" alt=""></img>
			<h2>What's in your Library?</h2> 
		</div>
	);
});

export default Splash;