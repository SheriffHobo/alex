import React, { useState } from 'react';
// import "./NewShelf/NewShelfStyle.css";

// name: req.body.name,
// description: req.body.description,
// categoryName: req.body.categoryName,
// categoryId: req.body.categoryId,
// customCategory: req.body.customCategory,
// image: req.body.image,

const NewShelf = React.memo(props => {
  // category drop down, with subcategory dropdown
  // auto select Other and disable dropdown if text in custom
  // on clearing custom field, enable dropdown, etc, remember old selection
  // categoryName is category by default unless a custom category is specified
  // have a check box for 'I don't see my category' to switch to custom
  // technically categoryName can be custom as well

  return (
		<main className="valign-wrapper newshelf">
		  <center>
			<form className="valign-wrapper newshelfform" method="post">
			  <div className='row'>


custom category
categoryName (or subcategory, click to populate)

  				<div className='input-field'>
  				  <input
              type='text'
              name='shelfname'
              id='shelfname'
              className='shelfinput'
              value={name}
              onChange={e => setName(e.target.value)}
            />
  				  <label for='shelfname'>
              Name your shelf
            </label>
  				</div>

          <div className='input-field'>
            <input
              type='text'
              name='shelfdesc'
              id='shelfdesc'
              className='shelfinput'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label for='shelfdesc'>
              Describe your shelf
            </label>
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='shelfcatname'
              id='shelfcatname'
              className='shelfinput'
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
            <label for='shelfcatname'>
              Select a subcategory below or type one in
            </label>
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='shelfcustom'
              id='shelfcustom'
              className='shelfinput'
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value)}
            />
            <label for='shelfcatname'>
              Choose a custom category
            </label>
          </div>          


  				<button
            type='submit'
            name='btn_createshelf'
            className='btn_createshelf btn-small waves-effect waves-light'
            onClick={() => alert()}
          >
            Create Shelf
          </button>

			  </div>
			</form>
		  </center>
		</main>
  );
});
  
export default NewShelf;