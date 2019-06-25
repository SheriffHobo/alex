import React, { useState, useEffect } from 'react';
// import io from "socket.io";

const Chat = React.memo(props => {
	const [ name, setName ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ socket, setSocket ] = useState('');
	const [ conversation, setConversation ] = useState([]);

	// useEffect(() => {
	// 	setSocket(io.connect("http://localhost:4000"));
	// }, []);

	// socket.on("messageSend", data => {
	// 	if (data.length) {
	// 		const conversation = data.map(message => {
	// 			return (
	// 				<div className="chat-message">
	// 					{message.name + ": " + message.message}
	// 				</div>
	// 			);
	// 		});

	// 		setConversation(conversation);
	// 		setMessage('');
	// 	}
	// });

	// const clear = () => {
	// 	socket.emit('clear');
	// }

	// socket.on('cleared', () => {
	// 	setConversation([]);
	// });

	return (
		<div className="container">
			{/*<div className="row">
				<div className="col-md-6 offset-md-3 col-sm-12">
					<h1 className="text-center">
						Alex Chat
                        <button
							id="clear"
							className="btn btn-danger"
							onClick={() => clear()}
						>
							Clear Chat History
                        </button>
					</h1>
					<div id="status" />
					<div id="chat">
						<input
							type="text"
							id="username"
							className="form-control"
							placeholder="Enter name..."
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<br />
						<div className="card">
							<div
								id="messages"
								className="card-block"
								style={{ height: '50vh' }}
							/>
							{conversation}
						</div>
						<br />
						<textarea
							id="textarea"
							className="form-control"
							placeholder="Enter message."
							value={message}
							onChange={e => setName(e.target.value)}
							onKeyDown={e => {
								if (e.which === 13 && e.shiftKey === false) {
									//Emit to server input
									socket.emit("outputMsg", {
										name: name,
										message,
									});

									e.preventDefault();
								}
							}}
						/>
					</div>
				</div>
			</div>*/}
		</div>
	);
});

export default Chat;