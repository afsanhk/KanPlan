import ScrollToBottom from "react-scroll-to-bottom";

import ChatMessage from "./ChatMessage";

// We use react-scroll-to-bottom here. It auto scrolls to bottom when height of messages exceeds the height of the container.
const ChatMessageList = ({ messages, userID, users }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message) => (
        <ChatMessage key={messages.id} message={message} userID={userID} users={users}/>
      ))}
    </ScrollToBottom>
  );
};

export default ChatMessageList;