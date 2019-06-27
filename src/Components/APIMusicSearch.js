import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import API from '../API/API'; // use to create a new item from master item

const APIMusicSearch = React.memo(props => {
	const [ musicSearch, setMusicSearch ] = useState('');
	const [ results, setResults ] = useState([]);

	const searchMusic = () => {
		if (!musicSearch) return;
		const baseUrl = "https://itunes.apple.com/search?term=";
		const params = "&entity=album";
		
		callAppleApi(baseUrl + musicSearch + params);
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
					<a href={link} target="_blank" rel="noopener noreferrer">{name}</a>
				</h6>
				<h6>
					{artist}
				</h6>
			</div>
		);
	});

	return (
		<>
			<input
				placeholder="search for music"
				value={musicSearch}
				onChange={e => setMusicSearch(e.target.value)}
			/>
			<button onClick={searchMusic}>Search Music</button>
			<button onClick={searchMusic}>Clear Results</button>
			{items}
		</>
	);
});

export default APIMusicSearch;