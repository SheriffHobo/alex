import React, { useState, useEffect } from 'react';
import API from '../../API/API';
import UserButton from '../UserButton/UserButton';
import Card from '../Card/Card';

const SearchDB = React.memo(props => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ users, setUsers ] = useState([]);
	const [ shelves, setShelves ] = useState([]);
	const [ items, setItems ] = useState([]);
	const [ showWhat, setShowWhat ] = useState([]);

	const search = () => {
		if (!searchTerm) return;
		getMany(props.collection, { name: searchTerm });
	};

// IT'S NOT ONLY GET MANY
	const getMany = (collection, query) => {
		API
			.search(collection, query)
			.then(result => {
				if (!Array.isArray(result)) result = [result];

				updateState(collection, result);
			})
			.catch(err => console.error(err));
	};

	const updateState = (collection, result) => {
		if (collection === 'items') {
			setItems(result);
			setShowWhat('items');
		}
		else if (collection === 'shelves') {
			setShelves(result);
			setShowWhat('shelves');
		}
		else if (collection === 'users') {
			setUsers(result);
			setShowWhat('users');
		}
	};

	const userList = users.map((user, index) => {
		return (
			<div className="userserchlistresults">
			<UserButton
				key={'user' + index}
				user={user}
				getMany={getMany}
			/>
			</div>
		);
	});

	const shelfList = shelves.map((shelf, index) => {
		return (
			<Card
				key={'shelf' + index}
				data={shelf}
				image={shelf.image}
				title={shelf.name}
				getMany={getMany}
				parentType={'users'}
				thisType={'shelves'}
				childType={'items'}
			/>
		);
	});

	const itemList = items.map((item, index) => {
		return (
			<Card
				key={'item' + index}
				data={item}
				image={item.image}
				title={item.name}
				getChildren={() => {}}
				getMany={getMany}
				parentType={'shelves'}
				thisType={'items'}
				childType={''}
			/>
		);
	});

	return (
		<div className="searchbox">
			<input
				className="searchpageinput"
				placeholder={"Search for " + props.collection}
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)} 
			/>
			<div className="searchbtns">
				<button onClick={search}>Search</button>
				<button
					onClick={() => {
						setUsers([]);
						setShelves([]);
						setItems([]);
					}}
				>
					Clear
				</button>
			</div>
			{
				showWhat === 'users'
					? userList
					: showWhat === 'shelves'
					? shelfList
					: showWhat === 'items'
					? itemList
					: <></>
			}
		</div>
	);
});

export default SearchDB;