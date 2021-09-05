import { useState, useEffect } from "react";
import useMessages from "../hooks/useMessages";
import io from "socket.io-client"; // Browser-side socket.io

import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

let socket;

export default function Chat({ userID, users }) {
  const { messageHistory, setMessageHistory } = useMessages();
  const [message, setMessage] = useState(""); // For the ChatInput form
  const ENDPOINT = "localhost:8001";

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"], upgrade: false });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  // Function to send messages
  const sendMessage = (event) => {
    event.preventDefault(); // Very important so that a page refresh doesn't happen

    if (message) {
      let newMessageID = 1 + Math.max(...messageHistory.map((el) => el.id));
      let newMessageObj = {
        id: newMessageID,
        user_id: userID,
        message_text: message,
        created_at: Date.now(),
      };
      console.log(newMessageObj);
      setMessageHistory((prev) => [...prev, newMessageObj]); // This should go inside socket.on but it works
      socket.emit("sendMessage", newMessageObj, () => setMessage("")); // This callback clears the input
    }
  };

  return (
    <div className="container">
      <ChatMessageList messages={messageHistory} userID={userID} users={users} />
      <ChatInput message={message} setMessage={setMessage} userID={userID} sendMessage={sendMessage} />
    </div>
  );
}
