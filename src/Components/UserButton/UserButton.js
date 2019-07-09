import React, { Fragment } from "react";
import userAPI from "../../API/API";
import Card from "../Card/Card";

const UserButton = React.memo(props => {
  const user = props.data || {};

  let shelves = [];
  if (props.selected)
    shelves = props.shelves.map(shelf => {
      return (
        <Card
          key={shelf.key}
          selected={shelf._id === props.selectedShelf}
          selectedChild={props.selectedChild}
          data={shelf}
          singular={"shelf"}
          getChildren={props.getChildren}
          items={props.items}
          childCollection={"items"}
        />
      );
    });

  const handleFollowing = async () => {
    const result = await userAPI.followUser(user._id);
  };
  return (
    <Fragment>
      <div className="usersearchresultbtn noselect">
        <div className="row userbtnrow">
          <div className="col xl2">
            {user.thumbnail ? (
              <img
                src={user.thumbnail}
                id="stamp"
                alt="user"
                onClick={() => props.getChildren("shelves", "user", user._id)}
              />
            ) : (
              <img
                src="/pictures/stampicon.png"
                id="stamp"
                alt="user"
                onClick={() => props.getChildren("shelves", "user", user._id)}
              />
            )}
          </div>
          <div className="col xl8">
            <h6 className="shelftitle">{user.firstName}</h6>
          </div>
          <div className="col xl2">
            <i className="fas fa-rss-square" onClick={handleFollowing} />
          </div>
        </div>
      </div>
      {shelves}
    </Fragment>
  );
});

export default UserButton;
