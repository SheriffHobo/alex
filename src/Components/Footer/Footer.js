import React from 'react';
import {Component} from 'react';
import "./Style.css";

class Footer extends Component {

  render() {
  return (
    <div className="Footer-fixed">
      <div className="">
        <a><i id="menubtn" className="menu-btn noselect small material-icons dropdown-trigger" href='#' data-target='dropdown1'>menu</i></a>
          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider" tabindex="-1"></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
            <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
          </ul>
        <a><i id="homebtn" className="home-btn noselect small material-icons" onClick={() => alert('go to home')}>home</i></a>
        <a><i id="chatbtn" className="chat-btn noselect small material-icons" onClick={() => alert('open chat')}>chat</i></a>
      </div>
    </div>
    );
  };
};

export default Footer;