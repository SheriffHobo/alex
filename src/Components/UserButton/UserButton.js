import React from 'react';

const UserButton = React.memo(props => {

	const user = props.user || {};

	return (
		<div
			className="shelfbutton noselect"
			onClick={() => props.getMany('shelves', { userId: user._id})}
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
});

export default UserButton;