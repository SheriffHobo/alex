import React, { useState, useEffect, Fragment } from 'react';
import M from 'materialize-css';
import { getCookie } from '../../API/cookies';
import API from '../../API/API';
import './CardStyle.css';

const Card = React.memo((props) => {
	const [ myId, setMyId ] = useState('');
	const [ showShelfPrompt, setShowShelfPrompt ] = useState(false);
	const [ myShelves, setMyShelves ] = useState([]);
	const [ itemCache, setItemCache ] = useState({});

	useEffect(() => {
		let elems = document.querySelectorAll('.dropdown-trigger');
		M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
	});

	// const todd = () => {
	//   const elems = document.querySelectorAll('.materialboxed');
	//   const instances = M.Materialbox.init(elems);
	// };

	useEffect(() => {
		// document.addEventListener('DOMContentLoaded', todd);
		setMyId(getCookie('_id'));

		// return document.removeEventListener('DOMContentLoaded', todd);
	}, []);

	const data = props.data;

	const specs = Object.keys(data).map((key, index) => {
		const value = data[key];
		return (
			<div key={'card' + index}>
				<strong>{`${key}: `}</strong>
				{value}
				<br />
				<br />
			</div>
		);
	});

	const addToMyShelf = (data, shelfId) => {
		API.addToMyShelf(data, shelfId)
			.then((result) => alert('Item added to your shelf!'))
			.catch((err) => console.error(err));
	};

	const promptForShelf = (data, external) => {
		data.external = external;

		API.getMyShelves()
			.then((result) => {
				setMyShelves(result);
				setItemCache(data);
				setShowShelfPrompt(true);
			})
			.catch((err) => console.error(err));
	};

	let title = data.name || '';
	title = title.length > 20 ? title.slice(0, 20) + '...' : title;

	let children = <div />;
	if (props.selected)
		children = props.items.map((child) => {
			const okToAdd = myId === child.userId ? null : addToMyShelf;
			return <Card key={child.key} data={child} singular={'item'} addToMyShelf={okToAdd} />;
		});

	if (showShelfPrompt) {
		const shelves = myShelves.map((shelf) => {
			return (
				<h5
					key={Math.random()}
					className="noselect"
					style={{ cursor: 'pointer', backgroundColor: 'silver', zIndex: '99999' }}
					onClick={() => {
						addToMyShelf(itemCache, shelf._id);
						setShowShelfPrompt(false);
					}}
				>
					{shelf.name}
				</h5>
			);
		});

		return (
			<div>
				choose a shelf to add {itemCache.name}:
				{shelves}
			</div>
		);
	}

	return (
		<Fragment>
			<div className="card">
				<div className="card-image waves-effect waves-block waves-light">
					<img className="card-image materialboxed" alt="" src={data.image} />
				</div>
				<div className="card-content">
					<span className="card-title">
						<h5>{title}</h5>
					</span>
					<i className="material-icons small right activator">more_vert</i>
				</div>
				<div className="cardbtns noselect">
					{props.link ? (
						<a href={props.link} target="_blank" rel="noopener noreferrer">
							{/* This will expand the shelf */}
							<i className="material-icons small" alt="Expand Shelf">
								details
							</i>
						</a>
					) : props.childCollection ? (
						<i
							className="material-icons small"
							alt="Open this Shelf"
							onClick={() => {
								props.getChildren(props.childCollection, props.singular, data._id);
							}}
						>
							details
						</i>
					) : (
						<div className="hiddendiv" />
					)}
					{props[props.childCollection] ? (
						<i
							className="material-icons small rotate180"
							alt="Close this Shelf"
							onClick={() => {
								props.getChildren(props.childCollection, null);
							}}
						>
							details
						</i>
					) : (
						<div className="hiddendiv" />
					)}

					{/* This icon will allow the adding of a new item to the shelf manual or to the search component */}
					{/* <i class="small material-icons">add_circle_outline</i> */}

					{/* The add circle icon should not appear if user is viewing another users shelf */}
					{(props.addToMyShelf || (myId !== data.userId && props.singular !== 'shelf')) && (
						<i
							className="material-icons small itemaddcircle dropdown-trigger"
							href="#"
							data-target="dropdown1"
							data-activates="dropdown1"
							alt="Add to one of your Shelves"
							onClick={() => promptForShelf(data, props.external)}
						>
							add_circle
						</i>
					)}
					<ul id="dropdown1" className="dropdown-content z-depth-5 additembtn" data-coverTrigger="false">
						{/* These Two are placeholders */}
						<li>Shelf One</li>
						<li>Shelf Two</li>
						{/* SHELF RESULT LIST DUMP */}
					</ul>
					{/* This button, when clicked, will add the shelf to your favs AND this should not be visible on YOUR shelves */}
					{/* <i className="material-icons small" alt="Add to Wishlist">favorite_border</i> */}
				</div>

				{/* </div> */}
				<div className="card-reveal">
					<i className="material-icons small right card-title" alt="Close Shelf Description">
						close
					</i>
					{/* 'specs' Should change depending on the card being created. Ex: Shelf card pop-ups should only have a small description of the shelf */}
					<div className="card-text">{specs}</div>
				</div>
			</div>
			<div>{children}</div>
		</Fragment>
	);
});
export default Card;
