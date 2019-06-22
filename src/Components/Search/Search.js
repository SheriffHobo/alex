import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import M from 'materialize-css';
import './SearchStyle.css';

class Search extends Component {

   
  
    render() {
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
          </div>

          <div className="searchbox">
              <div class="input-field search-box">
                <input id="search" type="search" required placeholder="Start Typing to Begin Search"></input>
              </div>
          </div>
        </div>
      );
    };
  };
  
  export default Search;