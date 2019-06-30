import React, { useEffect } from 'react';
import M from "materialize-css";
import "./CardStyle.css";
const Card = React.memo(props => {
  const todd = () => {
    const elems = document.querySelectorAll('.materialboxed');
    // const instances = M.Materialbox.init(elems);
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', todd);
    return document.removeEventListener('DOMContentLoaded', todd);
  }, []);

  const data = props.data;

  const specs = Object.keys(data).map((key, index) => {
    const value = data[key];
    return (
      <div key={'card' + index}>
        <strong>{`${key}: `}</strong>{value}
        <br /><br />
      </div>
    );
  });

  let title = data.name || '';
  title = title.length > 20
    ? title.slice(0, 20) + '...'
    : title;

  let children = <div />
  if (props.selected) children = props.items.map(child => {
    return (
      <Card
        key={child.key}
        data={child}
        singular={'item'}
      />
    );
  });

  return (
    <>
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="card-image materialboxed" alt="" src={data.image}></img>
        </div>
        <div className="card-content">
          <span className="card-title activator"><h5>{title}</h5><i className="material-icons small right">more_vert</i></span>
          <div className="cardbtns noselect">
            {
              props.link
                ? <a href={props.link} target="_blank" rel="noopener noreferrer">
                  {/* This will expand the shelf */}
                    <i className="material-icons small" alt="See this on the web">details</i>
                  </a>
                : props.childCollection
                ? <i
                    className="material-icons small"
                    alt="Open this Shelf"
                    onClick={() => {
                      props.getChildren(props.childCollection, props.singular, data._id);
                    }}
                  >
                    details
                  </i>
                : <div />  
            }
            {
              props[props.childCollection]
                ? <i
                    className="material-icons small rotate180"
                    alt="Close this Shelf"
                    onClick={() => {
                      props.getChildren(props.childCollection, null);
                    }}
                  >
                    details
                  </i>
                : <div />
            }
            {/* The add circle icon should not appear if user is viewing another users shelf */}
            <i className="material-icons small" alt="Add to one of your Shelves">add_circle</i> 
            {/* This button, when clicked, will add the shelf to your favs AND this should not be visible on YOUR shelves */}
            <i className="material-icons small" alt="Add to Wishlist">favorite_border</i>
          </div>
        </div>
        <div className="card-reveal">
          {/* Need to add logic to close the pop up */}
            <i className="material-icons small right card-title" alt="Close Shelf Description">close</i>
          {/* 'specs' Should change depending on the card being created. Ex: Shelf card pop-ups should only have a small description of the shelf */}
          <div className="card-text">{specs}</div>
        </div>
      </div>
      {children}
    </>
  );
});
export default Card;