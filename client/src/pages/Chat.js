import ChatMessageList from "../components/ChatMessageList";
import useMessages from "../hooks/useMessages";

export default function Chat({ userID, users }) {
  const { messageHistory } = useMessages();

  console.log(messageHistory);
  let messageHistoryCopy = JSON.parse(JSON.stringify(messageHistory));

  return (
    <div className="container">
      <ChatMessageList messages={messageHistoryCopy} userID={userID} users={users} />
      {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
    </div>
  );
}
