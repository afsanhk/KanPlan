import { useState } from "react";
import useMessages from "../hooks/useMessages";

import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

export default function Chat({ userID, users }) {
  const { messageHistory, setMessageHistory } = useMessages();
  const [message, setMessage] = useState(""); // For the ChatInput form

  // console.log(messageHistory);
  // let messageHistoryCopy = JSON.parse(JSON.stringify(messageHistory));

  // // Function to send messages
  const sendMessage = (event) => {
    event.preventDefault(); // Very important so that a page refresh doesn't happen

    if (message) {
      setMessage("");
      let newMessageID = 1 + Math.max(...messageHistory.map((el) => el.id));
      let newMessageObj = {
        id: newMessageID,
        user_id: userID,
        message_text: message,
        created_at: Date.now(),
      };
      console.log(newMessageObj);
      setMessageHistory((prev) => [...prev, newMessageObj]); // This should go inside socket.on but it works
    }

    //   if (message) {
    //     socket.emit("sendMessage", message, () => setMessage("")); // This callback clears the input
    //   }
  };

  return (
    <div className="container">
      <ChatMessageList messages={messageHistory} userID={userID} users={users} />
      <ChatInput message={message} setMessage={setMessage} userID={userID} sendMessage={sendMessage} />
    </div>
  );
}
