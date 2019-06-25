import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import API from '../API/API'; // use to create a new item from master item

const APISearch = React.memo(props => {
	const [ musicSearch, setMusicSearch ] = useState('');
	const [ movieSearch, setMovieSearch ] = useState('');
	const [ results, setResults ] = useState([]);

	const searchMusic = () => {
		if (!musicSearch) return;
		const baseUrl = "https://itunes.apple.com/search?term=";
		const params = "&entity=album&limit=10";
		
		callAppleApi(baseUrl + musicSearch + params);
	};

	const searchMovies = () => {
		if (!movieSearch) return;
		const baseUrl = "https://itunes.apple.com/search?term=";
		const params = "&entity=movie&limit=10";

		callAppleApi(baseUrl + movieSearch + params);
	};

	const callAppleApi = url => {
		axios.get(url)
			.then(res => setResults(res.data.results))
			.catch(err => console.error(err));
		
		// // when doing POST, here's kind of how it should work (map api data to schema)
		// const newItem = {
		// 	name: result.trackName || result.collectionName,
		// 	description
		// 	// shelf need to choose somehow
		// 	category
		// };
	}

	const items = results.map(result => {
		const name = result.trackName || result.collectionName || '';
		const artist = result.artistName || '';
		const link = result.wrapperType === 'collection'
			? result.collectionViewUrl
			: result.wrapperType === 'track'
			? result.trackViewUrl
			: '';

		return (
			<div style={{ backgroundColor: 'grey' }}>
				<h6>
					<a href={link}>{name}</a>
				</h6>
				<h6>
					{artist}
				</h6>
			</div>
		);
	});

	return (
		<>
			<hr />
			<h5>search for master items, ultimately be able to add link to item</h5>
			<input
				placeholder="search for music"
				value={musicSearch}
				onChange={e => setMusicSearch(e.target.value)}
			/>
			<button onClick={searchMusic}>search music</button>
			<input
				placeholder="search for movies"
				value={movieSearch}
				onChange={e => setMovieSearch(e.target.value)}
			/>
			<button onClick={searchMovies}>search movies</button>
			{items}
		</>
	);
});

export default APISearch;