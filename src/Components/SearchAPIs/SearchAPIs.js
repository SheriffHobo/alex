import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
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
			image: () => 'artworkUrl100',
			link: result => {
				console.log('hello',result)
				return result.wrapperType === 'collection'
					? result.collectionViewUrl
					: result.wrapperType === 'track'
					? result.trackViewUrl
					: '';
			},
		},
		iTunesVideo: {
			base: () => 'https://itunes.apple.com/search?term=',
			params: () => '&entity=movie',
			name: () => 'trackName',
			nameFallback: () => 'collectionName',
			artist: () => 'artistName',
			image: () => 'artworkUrl100',
			link: result => {
				return result.wrapperType === 'collection'
					? result.collectionViewUrl
					: result.wrapperType === 'track'
					? result.trackViewUrl
					: '';
			},
		},
	});

	const search = () => {
		if (!searchTerm) return;
		const baseUrl = urls[props.source].base();
		const params = urls[props.source].params();

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

	const items = results.map((result, index) => {
		const api = urls[props.source];
		if (!api) return <div />;

		const name = result[api.name(result)] || result[api.nameFallback(result)];
		const artist = result[api.artist(result)] || result[api.artistFallback(result)];
		const link = result[api.link(result)];
		const image = result[api.image(result)];

		return (
			<Card
				key={props.source + index}
        data={result}
        image={image}
        title={name + ' - ' + artist}
        link={link}
      />
		);
	});

	return (
		<div className="searchbox">
			<input
				className="searchpageinput"
				placeholder="Search for Collectables"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<div className="searchbtns">
				<button onClick={search}>Search</button>
				<button onClick={() => setResults([])}>Clear</button>
			</div>
			{items}
		</div>
	);
});

export default APIMusicSearch;