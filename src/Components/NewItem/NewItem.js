import React, { useState } from 'react';
import API from '../../API/API';
import "../NewShelf/NewShelfStyle.css";

const NewItem = React.memo(props => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ customCategory, setCustomCategory ] = useState('');

  const submit = () => {
    const shelfId = props.match.params.shelfId;
    if (!shelfId) return;

    const item = { name, description, customCategory, shelfId };

    API.create(item, 'items')
      .then(res => {
        alert('congrats')
        console.log('congrats',res)
      })
      .catch(err => console.error(err))
  }
  // shelf id needs to come in as a prop
  // no shelf id, no save
  // in route check shelf against token to be sure user owns it
  return (
    <main className="valign-wrapper newshelf">
      <center>
      <form className="valign-wrapper newshelfform" method="post">
        <div className='row'>

          <div className='input-field'>
            <input
              type='text'
              name='itemname'
              id='itemname'
              className='shelfinput'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor='itemname' className="noselect">
              Name your item
            </label>
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='itemdesc'
              id='itemdesc'
              className='shelfinput'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label htmlFor='itemdesc' className="noselect">
              Describe your item
            </label>
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='itemcustom'
              id='itemcustom'
              className='shelfinput'
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
            />
            <label htmlFor='itemcatname' className="noselect">
              Choose a custom category
            </label>
          </div>          

          <button
            name='btn_createitem'
            className='btn_createshelf btn-small waves-effect waves-light'
            onClick={e => {
              e.preventDefault();
              submit();
            }}
          >
            Create Shelf
          </button>

        </div>
      </form>
      </center>
    </main>
  );
});
  
export default NewItem;