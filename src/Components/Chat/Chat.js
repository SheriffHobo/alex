import React, { useState, useEffect } from 'react';
import ioClient from 'socket.io-client';
import { Button, Icon } from 'react-materialize'
import { getCookie } from '../../API/cookies';
import axios from 'axios';

const Chat = React.memo(props => {
	const [message, setMessage] = useState('');
	const [conversation, setConversation] = useState([]);

	useEffect(() => initIO(), []);
	const socketUrl = "http://localhost:8080"


	const initIO = () => {
		const socket = ioClient.connect(socketUrl);
		socket.on("messageSend", function (data) {
			setConversation(data);
		});
	}


	const submitMessage = async (event) => {
		const socket = ioClient.connect(socketUrl);
		event.preventDefault();
		const token = getCookie('token');

		await socket.emit("outputMsg", {
			message,
			token,
		});
		setMessage('');
	}

	const clearMessage = async () => {
		const result = await axios.delete('/api/chats/clear');
		console.log(result);
	}

	// const [ name, setName ] = useState('');
	// const [ message, setMessage ] = useState('');
	// const [ socket, setSocket ] = useState('');
	// const [ conversation, setConversation ] = useState([]);

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
		<div className="container valign-center chat">
			<div className="row">
				<div className="col-md-6 offset-md-3 col-sm-12">
					<h1 className="text-center">


					</h1>
					<div id="status" />
					<div id="chat">
						<br />
						<div className="card"
							id="messages"
							className="card-block"
							style={{ height: '50vh', display: "flex" }}>

							{conversation.map(msg => (

								<div>
									<h5>{msg.name}</h5>:<p>{msg.message}</p>
								</div>

							))}
						</div>
						<br />
						<textarea
							value={message}
							id="textarea"
							className="form-control"
							placeholder="Enter message."

							onChange={e => setMessage(e.target.value)}
						/>
						<button
							id="clear"
							className="btn btn-danger"
							onClick={() => {
								setConversation([]);
								clearMessage();
							}}
						>
							Clear Chat History
                        </button>
						<Button type="submit" waves="light" onClick={submitMessage}>
							Submit
							<Icon right>
								send
							</Icon>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Chat;