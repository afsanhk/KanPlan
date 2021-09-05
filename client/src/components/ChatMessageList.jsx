import ScrollToBottom from "react-scroll-to-bottom";

import ChatMessage from "./ChatMessage";

// We use react-scroll-to-bottom here. It auto scrolls to bottom when height of messages exceeds the height of the container.
const ChatMessageList = ({ messages, userID, users }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message) => (
        <div key={messages.id}>
          <ChatMessage message={message} userID={userID} users={users}/>
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default ChatMessageList;