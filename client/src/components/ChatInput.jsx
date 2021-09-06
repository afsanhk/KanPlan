import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="chat-input">
      <input
        className="input"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        // Pressing enter sends the chat message
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="send-button" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;