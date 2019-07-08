import React, { useState } from 'react';
import API from '../../API/API';
import "../NewShelf/NewShelfStyle.css";

const NewItem = React.memo(props => {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ customCategory, setCustomCategory ] = useState('');
  const [ image, setImage ] = useState('');
  const [ itemcount, setCount ] = useState('');
  const [ itemmanufacture, setManufacture ] = useState('');
  const [ year, setYear ] = useState('');
  const [ color, setColor ] = useState('');
  const [ size, setSize ] = useState('');
  const [ cost, setCost ] = useState('');

  const submit = () => {
    const shelfId = props.match.params.shelfId;
    if (!shelfId) return;

    const item = { name, description, customCategory, shelfId, image };

    API.create(item, 'items')
      .then(res => {
        alert('congrats')
        console.log('congrats',res)
      })
      .catch(err => console.error(err))
  }

  return (
    <main className="valign-wrapper addnewitem">
      <center>
      <form className="valign-wrapper newshelfform" method="post">
        <div className='row'>

          {/* NAME */}
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
              Name your Collectable
            </label>
          </div>

          {/* DESCRIPTION */}
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
              Describe your Collectable
            </label>
          </div>

          {/* MANUFACTURE */}
          <div className='input-field'>
            <input
              type='text'
              name='itemmanufacture'
              id='itemmanufacture'
              className='shelfinput'
              value={itemmanufacture}
              onChange={e => setManufacture(e.target.value)}
            />
            <label htmlFor='itemmanufacture' className="noselect">
              Who made this?
            </label>
          </div>

          {/* YEAR */}
          <div className='input-field'>
            <input
              type='text'
              name='itemyear'
              id='itemyear'
              className='shelfinput'
              value={year}
              onChange={e => setYear(e.target.value)}
            />
            <label htmlFor='itemyear' className="noselect">
              What year was this made?
            </label>
          </div>

          {/* COUNT */}
          <div className='input-field'>
            <input
              type='text'
              name='itemcount'
              id='itemcount'
              className='shelfinput'
              value={itemcount}
              onChange={e => setCount(e.target.value)}
            />
            <label htmlFor='itemcount' className="noselect">
              How many do you own?
            </label>
          </div>

          {/* CATAGORY */}
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
              Give it a Catagory
            </label>
          </div>

          {/* COLOR */}
          <div className='input-field'>
            <input
              type='text'
              name='itemcolor'
              id='itemcolor'
              className='shelfinput'
              value={color}
              onChange={e => setColor(e.target.value)}
            />
            <label htmlFor='itemcolor' className="noselect">
              What color?
            </label>
          </div>

          {/* SIZE */}
          <div className='input-field'>
            <input
              type='text'
              name='itemsize'
              id='itemsize'
              className='shelfinput'
              value={size}
              onChange={e => setSize(e.target.value)}
            />
            <label htmlFor='itemsize' className="noselect">
              What size?
            </label>
          </div>

           {/* COST */}
           <div className='input-field'>
            <input
              type='text'
              name='itemcost'
              id='itemcost'
              className='shelfinput'
              value={cost}
              onChange={e => setCost(e.target.value)}
            />
            <label htmlFor='itemcost' className="noselect">
              How much did this cost you?
            </label>
          </div>

          {/* IMAGE */}
          <div className='input-field'>
            <input
              type='text'
              name='itemimage'
              id='itemimage'
              className='shelfinput'
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <label htmlFor='itemcatname' className="noselect">
              Upload an image
            </label>
          </div>   

          {/* ADD BUTTON */}
          <button
            name='btn_createitem'
            className='btn_createshelf btn-small waves-effect waves-light'
            onClick={e => {
              e.preventDefault();
              submit();
            }}
          >
            Add Collectable
          </button>

        </div>
      </form>
      </center>
    </main>
  );
});
  
export default NewItem;