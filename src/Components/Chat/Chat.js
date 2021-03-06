import React, { useState, useEffect } from "react";
import ioClient from "socket.io-client";
import { Button, Icon } from "react-materialize";
import { getCookie } from "../../API/cookies";
import axios from "axios";
import "./ChatStyle.css";
import { conditionalExpression } from "@babel/types";

const Chat = React.memo(props => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    initIO();
  }, []);
  const socketUrl = "http://localhost:8080";

  const initIO = () => {
    const socket = ioClient.connect(socketUrl);
    socket.on("messageSend", function(data) {
      console.log(data);
      setConversation(data);
    });
  };

  const submitMessage = async event => {
    const socket = ioClient.connect(socketUrl);
    event.preventDefault();
    const token = await getCookie("token");

    await socket.emit("outputMsg", {
      message,
      token
    });
    setMessage("");
  };

  // const clearMessage = async () => {
  // 	const result = await axios.delete('/api/chats/clear');
  // 	console.log(result);
  // }

  return (
    <div className="Chatmain">
      <div className="Chat_Top">
        {conversation.map(msg => (
          <div id="chattextoutput">
            <p>
              <b>{msg.name}</b>: {msg.message}
            </p>
          </div>
        ))}
      </div>
      {/* <br /> */}
      <div className="Chat_Bottom">
        <textarea
          value={message}
          id="chattextarea"
          placeholder="Enter message."
          onChange={e => setMessage(e.target.value)}
        />
        <div className="Chat_Btn_Group">
          {/* <button
						className="Chat_Clear_Btn"
						onClick={() => {
							setConversation([]);
							clearMessage();
						}}
					>
						Clear Chat History
                        </button> */}
          <button
            className="Chat_Send_Btn small waves-effect waves-light"
            type="submit"
            onClick={submitMessage}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
});

export default Chat;
