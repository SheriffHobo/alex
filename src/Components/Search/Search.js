import React, { useState, useEffect } from 'react';
import './SearchStyle.css';
import UserSearchTest from '../UserSearchTest';
import SearchAPIs from '../SearchAPIs/SearchAPIs';
import SearchDB from '../SearchDB/SearchDB';
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
        <SearchDB collection={'users'} />
          </ul>}

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