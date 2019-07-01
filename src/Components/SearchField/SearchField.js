import React, { useState } from 'react';

const Search = React.memo(props => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const searchType = props.searchType[0].toUpperCase() + props.searchType.slice(1);

	const handleFocus = (event) => event.target.select();

  return (
  	<div>
	    <div className="userresult noselect" onClick={
	    	() => {
	    		if (!props.showInput) props.changeSearchType(props.searchType)
	    	}
	    }>
	      <div className="col xl2">
	        <i className={"small material-icons " + props.iconClass}>
	        	{props.icon}
	        </i>
	      </div>
	      <div className="col xl8">
	        <h6 className="btntitle">{searchType}</h6>
	      </div>
	      <div className="col xl2">
	        <i className="material-icons searchicon small">search</i>
	      </div>
	    </div>
	    {props.showInput &&
		    <div className='searchbox01'>
		      <div className="searchbox">
		        <input
		          className="searchpageinput"
		          placeholder={"Search for " + searchType}
				  value={searchTerm}
				  type="text" 
				  onFocus={handleFocus}
		          onChange={e => setSearchTerm(e.target.value)} 
		        />
		        <div className="searchbtns">
		          <button
				  	className="waves-effect waves-light"
		          	style={{ width: '100%' }}
		            onClick={() => props.search({ [props.queryKey]: searchTerm })}
		          >
		            Search
		          </button>
		        </div>
		      </div>
		    </div>
	    }
    </div>
  );
});
  
export default Search;