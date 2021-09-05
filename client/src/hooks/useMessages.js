import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [messages, setMessages] = useState({ messages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8001/api/messages").then((res) => {
      setMessages((prev) => ({
        ...prev,
        messages: res[0].data,
      }));
      setLoading(false);
    });
  }, []); //empty square brackets ensures that this useEffect is only ran once during page load
}
