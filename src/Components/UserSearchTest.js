import React, { useState, useEffect } from 'react';
import API from '../API/API';

const UserSearchTest = React.memo(props => {
	const [ users, setUsers ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');

	const search = () => {
		API
			.searchByName(searchTerm)
			.then(result => {setUsers(result)})
			.catch(err => console.error(err));
	};

	return (
		<div>
			<input
				placeholder="search for user"
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<button onClick={search}>search</button>
			{
				users.map(user => {
					return (
						<div
							className="shelfbutton noselect"
							onClick={() => alert('user id: ' + user._id)}
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
		</div>
	);
});

export default UserSearchTest;