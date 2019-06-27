import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import M from 'materialize-css';
import './SearchStyle.css';
import Card from '../Card/Card';
import UserSearchTest from '../UserSearchTest';
import APIMusicSearch from '../APIMusicSearch';
import APIVideoSearch from '../APIVideoSearch';
const Search = React.memo(props => {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchType, setSearchType ] = useState();

  const cards = Array(5).fill('').map(card => {
    return (
      <Card
        item={{
          year: '2016',
          arbitrary: 'data',
          and: 'more this is a description of stuff and whatnot',
          namelength: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorp',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis quam sit amet enim rutrum, tincidunt convallis mi ullamcorper. Mauris ut eros eros. Praesent imperdiet, ex at feugiat imperdiet, ex elit aliquam dolor, consectetur hendrerit nunc nisl non leo. Suspendisse volutpat tristique erat, quis dignissim neque posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet nibh neque. Etiam vel mi lectus. Sed magna lorem, consectetur id elit eu, aliquam rutrum urna. Phasellus vel vehicula ligula. Aenean nibh nibh, ultrices sit amet hendrerit vitae, aliquet vel metus. Morbi convallis semper mauris. Nunc posuere iaculis egestas. Donec suscipit aliquet nisl ut elementum. Praesent eu nisl vitae ex malesuada vulputate. Donec scelerisque ultricies viverra. Duis porta felis faucibus purus laoreet, at bibendum nulla congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi commodo, est ac euismod pretium, elit libero laoreet ante, ut tincidunt leo magna ac erat. Etiam id erat sed massa bibendum mollis a vel dolor. Sed a ullamcorper augue. Nullam sit amet sapien vitae turpis aliquam consequat. Vivamus convallis, magna quis finibus condimentum, ante dolor porttitor nibh, consectetur scelerisque arcu ipsum maximus neque. Donec viverra magna quis consequat tristique. In dapibus molestie lacinia. Duis eu sollicitudin turpis. Pellentesque sagittis pellentesque fringilla. Donec sodales ante a justo congue maximus. In non lorem tincidunt, eleifend mi et, aliquam purus. Donec imperdiet consectetur erat, vel lacinia turpis hendrerit eget. Quisque ac pulvinar mi. Cras bibendum tortor quam, sed maximus lacus facilisis vitae. Donec justo diam, iaculis a malesuada varius, vulputate vel libero. Nullam accumsan nibh tincidunt, consequat turpis vel, cursus arcu. Integer eu augue non metus suscipit eleifend. Duis tempus at metus a accumsan. Cras cursus, nisl accumsan molestie consequat, metus erat sodales metus, at sodales orci erat sed augue. Fusce vel egestas magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras in metus tellus. Vestibulum aliquet egestas justo, vitae lobortis justo vestibulum at. Nunc varius ultrices sem, eget cursus enim aliquam vel. Maecenas nunc eros, rutrum id egestas ac, eleifend id turpis. Vivamus non diam id purus ultrices condimentum. Etiam commodo a nisl efficitur sodales. Suspendisse lobortis felis velit, convallis consectetur velit vulputate et. Cras volutpat dapibus ornare. Phasellus vestibulum molestie sagittis. Sed elementum, lacus ac commodo pretium, tortor dui aliquet arcu, at fringilla nisi orci vitae lectus. Vivamus malesuada leo sed orci facilisis dapibus. Morbi sed commodo turpis. Nulla id gravida ipsum. Mauris sodales sem et bibendum tristique. Donec porta, justo sit amet rutrum commodo, nisl ante suscipit ligula, eget eleifend nisl ex congue urna. Ut ut dapibus augue. Etiam at congue purus. Maecenas dapibus mauris sed sem auctor, et scelerisque ex placerat. Nulla auctor lacinia massa ac hendrerit. Etiam non nibh ut ante lacinia auctor at ac leo. Mauris id quam nulla. Morbi ultricies non nibh sed sagittis. Phasellus tellus risus, hendrerit ut neque eu, vestibulum dignissim purus. Maecenas metus tortor, scelerisque in dui ut, semper feugiat felis. In ultrices ultrices ex non vestibulum. Vivamus ac sapien at massa gravida fringilla eget vitae eros. Pellentesque vulputate tempus ante eget finibus. Vestibulum et libero id tellus fermentum interdum. In tristique eleifend eros a placerat. Aenean mattis posuere augue, lobortis vehicula nibh iaculis non. Proin ante eros, varius at odio vitae, convallis maximus justo. In at diam vel leo posuere ornare. Mauris id ultricies velit. Cras eget tincidunt dui, at interdum quam. Vivamus cursus, metus in feugiat tincidunt, neque sapien blandit justo, sed ultricies sem ante tempor mi. Ut tincidunt, nunc at volutpat egestas, tellus odio mollis ante, non hendrerit purus enim in purus.',
        }}
        image={'/pictures/Damon/IMG_0858.jpg'}
        name={'Dancing Queen - Cher does not have a last name apparently'}
      />
    )
  });

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
            <img src="/pictures/stampicon.png" id="stamp"></img>
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
        <APIMusicSearch />
        </ul>}

        <div className="collectableresult" onClick={() => setSearchType(searchType !== 'video' ? 'video' : undefined)}>
        <div className="col xl2">
            <img src="/pictures/stampicon.png" id="stamp"></img>
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
        <APIVideoSearch />
        </ul>}

      </div>
  );
});
  
  export default Search;