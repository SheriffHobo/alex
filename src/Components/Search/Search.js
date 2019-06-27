import React, { useState, useEffect } from 'react';
import './SearchStyle.css';
import UserSearchTest from '../UserSearchTest';
import SearchAPIs from '../SearchAPIs/SearchAPIs';
import APIVideoSearch from '../APIVideoSearch';
const Search = React.memo(props => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchType, setSearchType ] = useState();

  return (
    <div className="searchmain">

      <div className="userresult" onClick={() => setSearchType(searchType !== 'users' ? 'users' : undefined)}>
          <div className="col xl2">
              <i className="small material-icons accounticon">account_box</i>
          </div>
          <div className="col xl8">
            {/* # = Total number of returned results */}
              <h6 className="btntitle">Users (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
      </div>
        {searchType === 'users' && <ul className='searchbox01'>
        <UserSearchTest />
          </ul>}

          {/* <div className="userresult" onClick={() => setSearchType(searchType !== 'shelves' ? 'shelves' : undefined)}>
          <div className="col xl2">
              <i className="small material-icons">account_box</i>
          </div>
          <div className="col xl8">
              <h6 className="btntitle">Users Shelves (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
        </div>
        {searchType === 'shelves' && <ul className='searchbox01'>
            <div className="searchbox">
              <div className="input-field search-box">
                <input
                  type="search"
                  required
                  placeholder="Enter Search Term"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="resultlist">
              <div className="userbuttons">
                {cards}
              </div>
            </div>
          </ul>} */}

          {/* <div className="collectableresult" onClick={() => setSearchType(searchType !== 'collectables' ? 'collectables' : undefined)}>
          <div className="col xl2">
              <i className="small material-icons">account_box</i>
          </div>
          <div className="col xl8">
              <h6 className="btntitle">Users Collectables (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
        </div>
        {searchType === 'collectables' && <ul className='searchbox01'>
            <div className="searchbox">
              <div className="input-field search-box">
                <input
                  type="search"
                  required
                  placeholder="Enter Search Term"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="resultlist">
              <div className="collectablelist">
                {cards}
              </div>
            </div>
          </ul>} */}

      <div className="collectableresult" onClick={() => setSearchType(searchType !== 'audio' ? 'audio' : undefined)}>
        <div className="col xl2">
            <img src="/pictures/stampicon.png" id="stamp" alt=""></img>
        </div>
        <div className="col xl8">
          {/* # = Total number of returned results */}
            <h6 className="btntitle">Collectables: Audio (#)</h6>
        </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
        </div>
        {searchType === 'audio' && <ul className='searchbox01'>
        <SearchAPIs source='iTunesAudio' />
        </ul>}

        <div className="collectableresult" onClick={() => setSearchType(searchType !== 'video' ? 'video' : undefined)}>
        <div className="col xl2">
            <img src="/pictures/stampicon.png" id="stamp" alt=""></img>
        </div>
        <div className="col xl8">
          {/* # = Total number of returned results */}
            <h6 className="btntitle">Collectables: Video (#)</h6>
        </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
        </div>
        {searchType === 'video' && <ul className='searchbox01'>
        <SearchAPIs source='iTunesVideo' />
        </ul>}

      </div>
  );
});
  
  export default Search;