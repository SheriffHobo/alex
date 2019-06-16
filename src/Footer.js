import React from 'react';

const Footer = React.memo(props => {
	return (
		<footer className="Footer-sticky">
      footer - this will get pushed down by the content, not usually visible
      <br />privacy policy
      <br />terms of use
      <br />cookie policy
      <br />careers at Alexandria 
    </footer>
	);
});

export default Footer;