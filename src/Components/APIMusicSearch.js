import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card/Card';
// import API from '../API/API'; // use to create a new item from master item

const APIMusicSearch = React.memo(props => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ results, setResults ] = useState([]);
	const [ urls, setUrls ] = useState({
		iTunesAudio: {
			base: () => 'https://itunes.apple.com/search?term=',
			params: () => '&entity=album',
			name: () => 'collectionName',
			nameFallback: () => 'trackName',
			artist: () => 'artistName',
			link: result => {
				return result.wrapperType === 'collection'
					? result.collectionViewUrl
					: result.wrapperType === 'track'
					? result.trackViewUrl
					: '';
			},
		},
		iTunesVideo: {
			base: 'https://itunes.apple.com/search?term=',
			params: '&entity=movie',
		},
	});

	const search = () => {
		if (!searchTerm) return;
		const baseUrl = urls[props.source].base;
		const params = urls[props.source].params;

		axios.get(baseUrl + searchTerm + params)
			.then(res => setResults(res.data.results))
			.catch(err => console.error(err));
	};
		
		// // when doing POST, here's kind of how it should work (map api data to schema)
		// const newItem = {
		// 	name: result.trackName || result.collectionName,
		// 	description
		// 	// shelf need to choose somehow
		// 	category
		// };

	const items = results.map(result => {
		const api = urls[props.source];
		if (!api) return <div />;

		const name = result[api.name()] || result[api.nameFallback()] || '';
		const artist = result[api.artist] || result[api.artistFallback] || '';
		// const link = result.wrapperType === 'collection'
		// 	? result.collectionViewUrl
		// 	: result.wrapperType === 'track'
		// 	? result.trackViewUrl
		// 	: '';

		const link = result[api.link];
		const image = '/pictures/Damon/IMG_0858.jpg';

		return (
			<Card
        item={result}
        image={image}
        title={name + ' - ' + artist}
      />
		);
	});

	return (
		<>
			<input
				placeholder="search for music"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button onClick={search}>Search Music</button>
			<button onClick={() => setResults([])}>Clear Results</button>
			{items}
		</>
	);
});

export default APIMusicSearch;