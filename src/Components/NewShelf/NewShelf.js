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
  // 

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
  
export default NewShelf;