import React, { useEffect } from 'react';
import M from "materialize-css";
import "./CardStyle.css";

const Card = React.memo(props => {
  const todd = () => {
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems);
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', todd);
    return document.removeEventListener('DOMContentLoaded', todd);
  }, []);

  const specs = Object.keys(props.data).map((key, index) => {
    const value = props.data[key];
    const toDisplay = ['name', 'description', 'categoryName', 'customCategory'];

    if (toDisplay.indexOf(key) !== -1) return (
      <div key={'card' + Math.random()}>
        <strong>{`${key}: `}</strong>{value}
        <br /><br />
      </div>
    );
  });

  let title = props.title || '';
  title = title.length > 20
    ? title.slice(0, 20) + '...'
    : title;

  const parentTypePlural = props.parentType ? props.parentType.slice() : '';
  const thisTypePlural = props.thisType ? props.thisType.slice() : '';
  const childTypePlural = props.childType ? props.childType.slice() : '';

  const parentType = parentTypePlural === 'shelves'
    ? 'shelf'
    : parentTypePlural.slice(0, -1);
  const thisType = thisTypePlural === 'shelves'
    ? 'shelf'
    : thisTypePlural.slice(0, -1);
  const childType = childTypePlural === 'shelves'
    ? 'shelf'
    : childTypePlural.slice(0, -1);

  const parentIdKey = parentType + 'Id';
  const thisIdKey = thisType + 'Id';

  return (
    <div className="row">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="card-image materialboxed" alt="" src={props.image}></img>
        </div>
        <div className="card-content">
<<<<<<< Updated upstream
          <span className="card-title activator"><h5>{title}</h5><i className="material-icons small right">more_vert</i></span>
          <div className="cardbtns">
=======
          <span className="card-title activator">{title}<i className="material-icons right">more_vert</i></span>
          <div className="cardbtns noselect">
>>>>>>> Stashed changes
            {
              parentTypePlural
                ? <span
                    style={{ fontSize: '1.5em' }}
                    onClick={() => {
                      console.log(parentTypePlural, {[parentIdKey]: props.data[parentIdKey]})
                      props.getMany(parentTypePlural, {
                        [parentIdKey]: props.data[parentIdKey]
                      });
                    }}
                  >
<<<<<<< Updated upstream
=======
                    back
>>>>>>> Stashed changes
                  </span>
                : <div />
            }
            {
              props.link
                ? <a href={props.link} target="_blank" rel="noopener noreferrer">
                  {/* This will expand the shelf */}
                    <i className="material-icons small" alt="See this on the web">details</i>
                  </a>
                : childTypePlural
                ? <i
                    className="material-icons small"
                    alt="Open this Shelf"
                    onClick={() => {
                      console.log(thisIdKey)
                      props.getMany(childTypePlural, {
                        [thisIdKey]: props.data._id
                      });
                    }}
                  >
                    details
                  </i>
                : <div />  
            }
             {
              props.link
                ? <a href={props.link} target="_blank" rel="noopener noreferrer">
                  {/* This needs to hide the shelf contents */}
                    <i className="material-icons small" alt="See this on the web">details</i>
                  </a>
                : childTypePlural
                ? <i
                    className="material-icons small rotate180"
                    alt="Close this Shelf"
                    onClick={() => {
                      console.log(thisIdKey)
                      props.getMany(childTypePlural, {
                        [thisIdKey]: props.data._id
                      });
                    }}
                  >
                    details
                  </i>
                : <div />
            }
<<<<<<< Updated upstream
            {/* The add circle icon should not appear if user is viewing another users shelf */}
            <i className="material-icons small" alt="Add to one of your Shelves">add_circle</i> 
            {/* This button, when clicked, will add the shelf to your favs AND this should not be visible on YOUR shelves */}
            <i className="material-icons small" alt="Add to Wishlist">favorite_border</i>
=======
            {
              props.thisType === 'items' || props.thisType === 'externalItem'
                ? <i
                    className="material-icons small"
                    alt="Add to one of your Shelves"
                    onClick={() => alert()}
                  >
                    add_circle
                  </i>
                : <div />
            }
            {
              false
                ? <i className="material-icons small" alt="Add to Wishlist">bookmark</i>
                : <div />
            }
>>>>>>> Stashed changes
          </div>
        </div>
        <div className="card-reveal">
          {/* Need to add logic to close the pop up */}
            <i className="material-icons small right card-title" alt="Close Shelf Description">close</i>
          {/* 'specs' Should change depending on the card being created. Ex: Shelf card pop-ups should only have a small description of the shelf */}
          <div className="card-text">{specs}</div>
        </div>
      </div>
    </div>
  );
});

export default Card;