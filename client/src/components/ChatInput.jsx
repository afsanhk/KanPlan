import React from "react";

import {TextField, Button} from '@material-ui/core';

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="chat-input">
      <TextField
          id="outlined-multiline-static"
          multiline
          variant="outlined"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          // Pressing enter sends the message
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      <Button className="send-button" onClick={(event) => sendMessage(event)}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;