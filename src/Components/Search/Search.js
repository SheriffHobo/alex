import React, { useState, useEffect } from 'react';
import API from '../../API/API';
import Card from '../Card/Card';
import SearchField from '../SearchField/SearchField';
import UserButton from '../UserButton/UserButton';
import UserSearchTest from '../UserSearchTest';
import axios from 'axios';
import './SearchStyle.css';

const Search = React.memo(props => {
  const [ searchType, setSearchType ] = useState('');
  const [ resultType, setResultType ] = useState('');
  const [ users, setUsers ] = useState([]);
  const [ shelves, setShelves ] = useState([]);
  const [ items, setItems ] = useState([]);
  const [ audio, setAudio ] = useState([]);
  const [ video, setVideo ] = useState([]);
  const [ selectedUser, setSelectedUser ] = useState('');
  const [ selectedShelf, setSelectedShelf ] = useState('');
  
  const stateLookup = {
    users: { value: users, set: setUsers, singular: 'user', childName: 'shelves', },
    shelves: { value: shelves, set: setShelves, singular: 'shelf', childName: 'items', },
    items: { value: items, set: setItems, singular: 'item' },
    audio: { value: audio, set: setAudio, singular: 'audio' },
    video: { value: video, set: setVideo, singular: 'audio' },
  };

  const lookedUp = stateLookup[searchType] || {};

  const searchDB = query => {
    API
      .search(searchType, query)
      .then(result => {
        if (!Array.isArray(result)) result = [result];
        result.forEach(obj => obj.key = obj._id);
        lookedUp.set(result);
        setResultType(searchType);
      })
      .catch(err => console.error(err));
  };

  const getChildren = (childCollection, parentSingular, parentId) => {
    if (!parentSingular) {
      return stateLookup[childCollection].set([]);
    }

    const parentIdKey = parentSingular + 'Id';
    API
      .search(childCollection, { [parentIdKey]: parentId })
      .then(result => {
        if (!Array.isArray(result)) result = [result];
        result.forEach(obj => obj.key = obj._id);
  
        if (parentSingular === 'user') setSelectedUser(parentId)
        if (parentSingular === 'shelf') setSelectedShelf(parentId)

        stateLookup[childCollection].set(result);
      })
      .catch(err => console.error(err));
  }

  const searchAPI = (apiType, searchTerm) => {
    if (!searchTerm || !apiType) return;
    const api = API.externalAPIs[apiType];

    axios.get(api.base() + searchTerm + api.params())
      .then(res => {
        const results = res.data.results.map(result => {
          const name = api.name(result) || api.nameFallback(result);
          const artist = api.artist(result) || api.artistFallback(result);
          
          return ({
            key: Math.random(),
            name: name + ' ' + artist,
            link: api.link(result),
            image: api.image(result),
            artist,
          });
        });

        // setResultType(apiType);
        stateLookup[apiType].set(results);
      })
      .catch(err => console.error(err));
  };

  const changeSearchType = type => {
    setSearchType(type);
    setItems([]);
    setShelves([]);
    setUsers([]);
  }

  const resultsArr = lookedUp.value || [];
  const ListComponent = resultType === 'users'
    ? UserButton
    : Card

  const resultsList = resultsArr.map(result => {
    const selected = (ListComponent === UserButton ? selectedUser : selectedShelf) === result._id;
    return (
      <ListComponent
        key={result.key}
        selected={selected}
        data={result || {}}
        singular={lookedUp.singular}
        getChildren={getChildren}
        shelves={shelves}
        items={items}
        selectedShelf={selectedShelf}
        childCollection={lookedUp.childName}
      />
    );
  });

  return (
    <div className="searchmain">

      <SearchField
        searchType={'users'}
        icon={'account_box'}
        iconClass={'accounticon'}
        changeSearchType={changeSearchType}
        showInput={searchType === 'users'}
        search={searchDB}
      />
      {searchType === 'users' && resultsList}

      <SearchField
        searchType={'shelves'}
        icon={'account_box'}
        iconClass={'accounticon'}
        changeSearchType={changeSearchType}
        showInput={searchType === 'shelves'}
        search={searchDB}
      />
      {searchType === 'shelves' && resultsList}

      <SearchField
        searchType={'items'}
        icon={'account_box'}
        iconClass={'accounticon'}
        changeSearchType={changeSearchType}
        showInput={searchType === 'items'}
        search={searchDB}
      />
      {searchType === 'items' && resultsList}

      <SearchField
        searchType={'audio'}
        icon={'radio'}
        iconClass={''}
        changeSearchType={changeSearchType}
        showInput={searchType === 'audio'}
        search={searchAPI}
      />
      {searchType === 'audio' && resultsList}

      <SearchField
        searchType={'video'}
        icon={'theaters'}
        iconClass={''}
        changeSearchType={changeSearchType}
        showInput={searchType === 'video'}
        search={searchAPI}
      />
      {searchType === 'video' && resultsList}

    </div>
  );
});
  
  export default Search;