import React from "react";

import {TextField, Button} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #bdbdbd',
    overflow: 'hidden',
    backgroundColor: '#fcfcfc',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      border: '1px solid #bdbdbd'
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      borderColor: '#bdbdbd',
      'border-style': 'solid none solid solid',
    },
    
  },
  focused: {},
}));


const ChatInput = ({ message, setMessage, sendMessage }) => {
  const classes = useStyles();

  return (
    <div className="chat-input">
      <TextField
          id="outlined-multiline-static"
          className="input"
          multiline
          variant="outlined"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          // Pressing enter sends the message
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
          InputProps={{
            classes,
            style: { borderRadius: '5px 0 0 5px' },
          }}
          inputProps={{
            maxLength: 255,
          }}
        />
      <Button className="send-button" onClick={(event) => sendMessage(event)} style={{borderRadius: '0 5px 5px 0'}}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;