import Moment from 'react-moment';

export default function ChatMessage({message, users, loggedIn}){

  const username = users[message.user_id].user_name;
  const time = <Moment format="YYYY/MM/DD hh:mm a">{message.created_at}</Moment>
  const messageContent = message.message_text;

  return loggedIn ? (
    <div className="message-container ">
      <div className="message-box logged-in">
        <div className="sent-text-header">
          <p className="message-sender">{username}</p>
          <p className="message-time">{time}</p>
        </div>
        <p className="message-text mine">{messageContent}</p>
      </div>
    </div>
  ) : (
    <div className="message-container">
      <div className="message-box">
      <div className="sent-text-header">
        <p className="message-time">{time}</p>
        <p className="message-sender">{username}</p>
      </div>
      <p className="message-text not-mine">{messageContent}</p>  
      </div>
    </div>
  )
} 