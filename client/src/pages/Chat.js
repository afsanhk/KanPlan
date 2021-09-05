import useMessages from "../hooks/useMessages";

export default function Chat({ userID }) {
  const { messageHistory } = useMessages();

  console.log(messageHistory);
  return (
    <>
      <h1>This page will show chat messages!</h1>
      <p>{messageHistory.map((el) => el.message_text)}</p>
    </>
  );
}
