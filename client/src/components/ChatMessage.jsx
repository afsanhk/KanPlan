export default function ChatMessage({message, userID, users}){

  let loggedIn = false;

  if (message.user_id === userID) {
    loggedIn = true;
  }

  return loggedIn ? (
    <div className="message-container logged-in justifyEnd">
      <p className="sent-text pr-10">{users[message.user_id].user_name}</p>
      <div className="message-box">
        <p className="message-text">{message.message_text}</p>
        <p className="message-time">{(message.created_at)}</p>
      </div>
    </div>
  ) : (
    <div className="message-container not-logged-in justifyStart">
      <div className="message-box backgroundLight">
        <p className="message-text colorDark">{message.message_text}</p>
      </div>
      <p className="sent-text pl-10">{users[message.user_id].user_name}</p>
      <p className="message-time">{(message.created_at)}</p>
    </div>
  )
} 