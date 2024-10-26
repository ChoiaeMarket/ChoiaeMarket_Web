import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";

export const useChatService = (
  roomId: string,
  onMessageReceived: (message: {
    senderEmail: string;
    content: string;
    timestamp: string;
  }) => void
) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: "ws://localhost:4000/ws",
      onConnect: () => {
        console.log("Connected to WebSocket");
        clientRef.current?.subscribe(`/topic/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          onMessageReceived({
            senderEmail: body.senderEmail,
            content: body.content,
            timestamp: body.timestamp,
          });
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
    });

    clientRef.current.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomId, onMessageReceived]);

  const sendMessage = (senderEmail: string, content: string) => {
    if (clientRef.current && clientRef.current.connected) {
      const message = {
        senderEmail,
        content,
        roomId,
      };
      clientRef.current.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify(message),
      });
    }
  };

  return { sendMessage };
};
