import React, { useState, useEffect } from 'react';
import './SearchStyle.css';
import UserSearchTest from '../UserSearchTest';
import SearchAPIs from '../SearchAPIs/SearchAPIs';
import SearchDB from '../SearchDB/SearchDB';

const Search = React.memo(props => {
// const [ searchTerm, setSearchTerm ] = useState('');
const [ searchType, setSearchType ] = useState();

  return (
    <div className="searchmain">

{/* User Search Field */}
      <div className="userresult" onClick={() => setSearchType(searchType !== 'users' ? 'users' : undefined)}>
          <div className="col xl2">
              <i className="small material-icons accounticon">account_box</i>
          </div>
          <div className="col xl8">
              <h6 className="btntitle">Users (#)</h6>
          </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
      </div>
        {searchType === 'users' && <ul className='searchbox01'>
        <SearchDB collection={'users'} />
          </ul>}

{/* Audio Search Field */}
      <div className="collectableresult" onClick={() => setSearchType(searchType !== 'audio' ? 'audio' : undefined)}>
        <div className="col xl2">
          <i class="material-icons small">radio</i>
        </div>
        <div className="col xl8">
            <h6 className="btntitle">Collectables: Audio (#)</h6>
        </div>
          <div className="col xl2">
              <i className="material-icons searchicon small">search</i>
          </div>
        </div>
        {searchType === 'audio' && <ul className='searchbox01'>
        <SearchAPIs source='iTunesAudio' />
        </ul>}

{/* Video Seaarch Field */}
        <div className="collectableresult" onClick={() => setSearchType(searchType !== 'video' ? 'video' : undefined)}>
        <div className="col xl2">
          <i class="material-icons small">theaters</i>
        </div>
        <div className="col xl8">
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