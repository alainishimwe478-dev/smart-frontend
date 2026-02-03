import { useEffect } from "react";

export const useAlerts = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/alerts");

    ws.onmessage = (event) => {
      alert(event.data);
    };

    return () => ws.close();
  }, []);
};
