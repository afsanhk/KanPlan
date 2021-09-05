import useMessages from "../hooks/useMessages";

export default function Chat({ userID, users }) {
  const { messageHistory } = useMessages();

  console.log(messageHistory);
  let messageHistoryCopy = JSON.parse(JSON.stringify(messageHistory));

  return (
    <>
      <h1>This page will show chat messages!</h1>
      <p>{messageHistoryCopy.map((el) => el.message_text)}</p>
    </>
  );
}
