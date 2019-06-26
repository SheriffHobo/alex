import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
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

  const specs = Object.keys(props.item).map((key, index) => {
    const value = props.item[key];

    return (
      <div key={'card' + index}>
        <strong>{`${key}: `}</strong>{value}
        <br /><br />
      </div>
    );
  });

  const name = props.name.length > 20
    ? props.name.slice(0, 20) + '...'
    : props.name;

  return (
    <div className="row">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="card-image materialboxed" src={props.image}></img>
        </div>
        <div className="card-content">
          <span className="card-title activator">{name}<i className="material-icons right">more_vert</i></span>
          <div className="cardbtns">
            <i className="material-icons small" alt="See this on the web">exit_to_app</i>
            <i className="material-icons small" alt="Add to one of your Shelves">add_circle</i>
            <i className="material-icons small" alt="Add to Wishlist">bookmark</i>
          </div>
        </div>
        <div className="card-reveal">
          <div className="card-title">
            Cthulhu
            <i className="material-icons small right">close</i>
          </div>
          <div className="card-text">{specs}</div>
        </div>
      </div>
    </div>
  );
});

export default Card;