import React, { useState } from 'react';
import Card from '../Card/Card';

const UserButton = React.memo(props => {
	const user = props.data || {};

	let shelves = [];
	if (props.selected) shelves = props.shelves.map(shelf => {
		return (
			<Card
        key={shelf.key}
        selected={shelf._id === props.selectedShelf}
        selectedChild={props.selectedChild}
        data={shelf}
        singular={'shelf'}
        getChildren={props.getChildren}
        items={props.items}
        childCollection={'items'}
      />
		);
	});

	return (
		<>
			<div
				className="usersearchresultbtn noselect"
				onClick={() => props.getChildren('shelves', 'user', user._id)}
			>
				<div className="row userbtnrow">
					<div className="col xl2">
						{
						user.thumbnail
							? <img src={user.thumbnail} id="stamp" alt="user image" />
							: <img src="/pictures/stampicon.png" id="stamp" alt="user image" />
						}
					</div>
					<div className="col xl8">
						<h6 className="shelftitle">{user.firstName}</h6>
					</div>
					<div className="col xl2">
						<i className="material-icons small hearticonnotliked">favorite_border</i>
					</div>
				</div>
	  	</div>
			{shelves}
		</>
	);
});

export default UserButton;