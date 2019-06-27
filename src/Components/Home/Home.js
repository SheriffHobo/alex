import React from 'react';
import { Link } from "react-router-dom";
import ShelfButton from '../ShelfButton/ShelfButton';
import "./HomeStyle.css"

const Home = React.memo(props => {

	const shelves = Array(5).map(shelf => {
		return (
			<ShelfButton />
		);
	})

  return(
    <div className="Home shelfbtnlist">
      {shelves}
    </div>
  );
});

export default Home;