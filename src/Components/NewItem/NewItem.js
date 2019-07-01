import React, { useState } from 'react';
// import "../NewShelf/NewShelfStyle.css";

const NewItem = React.memo(props => {

  // shelf id needs to come in as a prop
  // no shelf id, no save
  // in route check shelf against token to be sure user owns it

  return (
    <main className="valign-wrapper newshelf">
      <center>
      <form className="valign-wrapper newshelfform" method="post">
        <div className='row'>

          <div className='input-field'>
            <input  type='text' name='shelftitle' id='shelftitle' />
            <label for='shelftitle'>Shelf Name</label>
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='shelfdesc'
              id='shelfdesc' />
            <label for='shelfdesc'>Description</label>
          </div>

          <button
            type='submit'
            name='btn_createshelf'
            className='btn_createshelf btn-small waves-effect waves-light'
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