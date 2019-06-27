import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./NewShelfStyle.css";


class NewShelf extends Component {

    render() {
      return (

        <main className="valign-wrapper newshelf">
            <div className="container align-center">
                <div className="row">
                    <center>
                        <form className="valign-wrapper newshelfform" method="post">
                        <div className='row'>

                            <div className='input-field'>
                                <input  type='text' name='shelftitle' id='shelftitle' />
                                <label for='shelftitle'>Shelf Name</label>
                            </div>

                            <div className='input-field'>
                                <input  type='text' name='shelfdesc' id='shelfdesc' />
                                <label for='shelftitle'>Description (50 Char Max)</label>
                            </div>
                            
                            <button type='submit' name='btn_createshelf' className='btn_createshelf btn-small'><Link to="/me">Create Shelf</Link></button>
                        </div>
                        </form>
                    </center>
                </div>
            </div>
        </main>
      );
    };
  };
  
  export default NewShelf;


//   We need logic that once the create shelf button is clicked, the shelf is added to YOUR list of shelves (/me), a place holder image (the stamp icon) appears (left).