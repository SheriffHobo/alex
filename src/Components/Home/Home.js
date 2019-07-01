import React, { useState, useEffect } from 'react';
import API from '../../API/API';
import Card from '../Card/Card';
import "./HomeStyle.css"

const Home = React.memo(props => {
	const [ selectedShelf, setSelectedShelf ] = useState('');
	const [ shelves, setShelves ] = useState([]);
	const [ items, setItems ] = useState([]);

	const stateLookup = {
    shelves: { value: shelves, set: setShelves, singular: 'shelf', childName: 'items', },
    items: { value: items, set: setItems, singular: 'item' },
  };

  const lookedUp = stateLookup.shelves;

	useEffect(() => {
		API
      .getMyShelves()
      .then(result => {
        if (!Array.isArray(result)) result = [result];
        result.forEach(obj => obj.key = obj._id);
        setShelves(result);
      })
      .catch(err => console.error(err));
	}, []);

	const getChildren = (childCollection, parentSingular, parentId) => {
    if (!parentSingular) {
      return setItems([]);
    }

    API
      .search(childCollection, { shelfId: parentId })
      .then(result => {
        if (!Array.isArray(result)) result = [result];
        result.forEach(obj => obj.key = obj._id);
  
        setSelectedShelf(parentId)
        setItems(result);
      })
      .catch(err => console.error(err));
  }

	const resultsList = shelves.map(result => {
    const selected = (selectedShelf === result._id);
    return (
      <Card
        key={result.key}
        selected={selected}
        data={result || {}}
        singular={'shelf'}
        getChildren={getChildren}
        items={items}
        selectedShelf={selectedShelf}
        childCollection={'items'}
      />
    );
  });

  return(
    <div className="Home shelfbtnlist">
    	{resultsList}
    </div>
  );
});

export default Home;