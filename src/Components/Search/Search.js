import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import M from 'materialize-css';
import './SearchStyle.css';

const Search = React.memo(props => {
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => document.getElementById("search").focus());

  return (
    <div className="searchmain">

      <div className="userresult">
          <div className="col xl2">
              <i className="small material-icons arrowicon">account_box</i>
          </div>
          <div className="col xl8">
            {/* # = Total number of returned results */}
              <h6 className="shelftitle">Users (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons arrowicon">arrow_drop_down</i>
          </div>

            <div id="userlist">
              <ul id="userbuttons">
              </ul>
            </div>

      </div>
      <div className="collectableresult">
          <div className="col xl2">
              <img src="/pictures/stampicon.png" id="stamp"></img>
          </div>
          <div className="col xl8">
            {/* # = Total number of returned results */}
              <h6 className="shelftitle">Collectables (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons arrowicon">arrow_drop_down</i>
          </div>

          <div id="collectablelist">
              <ul id="collectablecards">
              </ul>
            </div>

      </div>

      <div className="searchbox">
          <div id="searchbox" className="input-field search-box">
            <input
              id="search"
              type="search"
              required
              placeholder="Start Typing to Begin Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
      </div>
    </div>
  );
});
  
  export default Search;