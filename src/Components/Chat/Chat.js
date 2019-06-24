import React, { useState, useEffect } from 'react';
import io from "socket.io";
const Chat = React.memo(props => {
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const [socket, setSocket] = useState('');

	useEffect(() => {
		setSocket(io.connect("http://localhost"));
	}, []);

	let conversation = [];

	socket.on("messageSend", data => {
		if (data.length) {
			conversation = data.map(message => {
				return (
					<div className="chat-message">
						{message.name + ": " + message.message}
					</div>
				);
			});

			setMessage('');
		}
	});

	const clear = () => {
		socket.emit('clear');
	}

	socket.on('cleared', () => {
		conversation = [];
	});

	return (
		<div className="container">
			<div className="row">
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
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<br />
						<div className="card">
							<div
								id="messages"
								className="card-block"
								style={{ height: '50vh' }}
							/>
							{conversations}
						</div>
						<br />
						<textarea
							id="textarea"
							className="form-control"
							placeholder="Enter message."
							value={message}
							onChange={e => setUsername(e.target.value)}
							onKeyDown={e => {
								if (e.which === 13 && e.shiftKey === false) {
									//Emit to server input
									socket.emit("outputMsg", {
										name: username.value,
										message: textarea.value
									});

									event.preventDefault();
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Chat;