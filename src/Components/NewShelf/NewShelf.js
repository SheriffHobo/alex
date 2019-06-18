import React from 'react';
import { Link } from "react-router-dom";
import {Component} from 'react';
import "./NewShelfStyle.css";


class NewShelf extends Component {

    render() {
      return (
        <main className="valign-wrapper">
            <div className="container align-center">
                <div className="row">
                    <center>
                        <form className="valign-wrapper" method="post">
                        <div className='row'>

                            <div className='input-field'>
                                <input  type='text' name='shelftitle' id='shelftitle' />
                                <label for='shelftitle'>First Name</label>
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