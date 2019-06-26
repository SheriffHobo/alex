import React, { useState, useEffect } from 'react';
import API from '../API/API';

const UserSearchTest = React.memo(props => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ users, setUsers ] = useState([]);
	const [ shelves, setShelves ] = useState([]);

	const search = () => {
		if (!searchTerm) return;
		API
			.searchByName(searchTerm)
			.then(result => {setUsers(result)})
			.catch(err => console.error(err));
	};

	const getShelves = userId => {
		console.log(userId)
		API
			.getShelvesByUserId(userId)
			.then(result => {
				console.log(result)
				setShelves(result)
			})
			.catch(err => console.error(err));
	};

	return (
		<div>
			<input
					placeholder="search for user"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="material-icons searchicon small js" 
					onClick={search}
				/>
				{/* <i className="material-icons searchicon small" onClick={search}>search</i> */}
			{
				users.map(user => {
					return (
						<div
							className="shelfbutton noselect"
							onClick={() => getShelves(user._id)}
						>
	            <div className="row">
                <div className="col xl2">
                	{
                  	user.thumbnail
                  		? <img src={user.thumbnail} id="stamp" />
                  		: <img src="/pictures/stampicon.png" id="stamp" />
                	}
                </div>
                <div className="col xl8">
                  <h6 className="shelftitle">{user.firstName}</h6>
                </div>
                <div className="col xl2">
                  <i className="material-icons hearticonnotliked">favorite_border</i>
	               </div>
	            </div>
	        	</div>
					);
				})
			}
			{
				shelves.map(shelf => {
					return (
						<div
							style={{ backgroundColor: 'silver', margin: '2px' }}
							onClick={() => alert('shelf id: ' + shelf._id)}
						>
            	{
              	shelf.thumbnail
              		? <img src={shelf.thumbnail} id="stamp" />
              		: <img src="/pictures/stampicon.png" id="stamp" />
            	}
	            <h6>{shelf.name}</h6>
	            <h7>
	            	{
	            		shelf.categoryName === 'Other'
	            			? shelf.customCategory || 'Other'
	            			: shelf.categoryName
	            	}
	            </h7>
          	</div>
					);
				})
			}
		</div>
	);
});

export default UserSearchTest;