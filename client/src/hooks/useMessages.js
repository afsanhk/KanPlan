import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8001/api/messages").then((res) => {
      setMessageHistory([...res.data]);
      setLoading(false);
    });
  }, []); //empty square brackets ensures that this useEffect is only ran once during page load

  return { messageHistory, setMessageHistory };
}
