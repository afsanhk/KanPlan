import ScrollToBottom from "react-scroll-to-bottom";

import ChatMessage from "./ChatMessage";

// We use react-scroll-to-bottom here. It auto scrolls to bottom when height of messages exceeds the height of the container.
const ChatMessageList = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <ChatMessage message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default ChatMessageList;