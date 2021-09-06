export default function ChatMessage({message, userID, users}){

  let loggedIn = false;

  if (message.user_id === userID) {
    loggedIn = true;
  }

  return loggedIn ? (
    <div className="message-container ">
      <div className="message-box logged-in">
        <p className="sent-text">{users[message.user_id].user_name}</p>
        <p className="message-text">{message.message_text}</p>
        <p className="message-time">{(message.created_at)}</p>
      </div>
    </div>
  ) : (
    <div className="message-container">
      <div className="message-box">
        <p className="sent-text">{users[message.user_id].user_name}</p>
        <p className="message-text">{message.message_text}</p>
        <p className="message-time">{(message.created_at)}</p>
      </div>
    </div>
  )
} 