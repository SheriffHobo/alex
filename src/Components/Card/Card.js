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

    return (
      <div key={'card' + index}>
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
          <img className="card-image materialboxed" src={props.image}></img>
        </div>
        <div className="card-content">
          <span className="card-title activator">{title}<i className="material-icons small right">more_vert</i></span>
          <div className="cardbtns">
            {
              parentTypePlural
                ? <span
                    onClick={() => {
                      props.getMany(parentTypePlural, {
                        [parentIdKey]: props.data[parentIdKey]
                      });
                    }}
                  >
                  </span>
                : <div />
            }
            {
              props.link
                ? <a href={props.link} target="_blank" rel="noopener" rel="noreferrer">
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
                ? <a href={props.link} target="_blank" rel="noopener" rel="noreferrer">
                    <i className="material-icons small" alt="See this on the web">details</i>
                  </a>
                : childTypePlural
                ? <i
                    className="material-icons small rotate180"
                    // style="transform: rotate(45deg)"
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
            <i className="material-icons small" alt="Add to one of your Shelves">add_circle</i>
            <i className="material-icons small" alt="Add to Wishlist">bookmark</i>
          </div>
        </div>
        <div className="card-reveal">
          <div className="card-title">
            {title}
            <i className="material-icons small right">close</i>
          </div>
          <div className="card-text">{specs}</div>
        </div>
      </div>
    </div>
  );
});

export default Card;