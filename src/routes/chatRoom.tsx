import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";

// 채팅 메시지 인터페이스 정의
interface ChatMessage {
  senderEmail: string;
  content: string;
  roomId: string;
}

export default function ChatRoom() {
  const { userEmail, roomId } = useParams<{
    userEmail: string;
    roomId: string;
  }>(); // URL에서 파라미터 추출
  const [stompClient, setStompClient] = useState<any>(null); // STOMP 클라이언트 상태
  const [messages, setMessages] = useState<ChatMessage[]>([]); // 채팅 메시지 배열
  const [message, setMessage] = useState<string>(""); // 입력 메시지 상태

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS("http://localhost:4000/ws"); // 서버의 WebSocket 엔드포인트에 연결
    const stompClient = Stomp.over(() => socket); // STOMP를 사용해 SockJS로 WebSocket 연결
    console.log(socket);
    console.log(stompClient);

    console.log("0");
    // STOMP 클라이언트 연결
    stompClient.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
        // 특정 채팅방(roomId)에 대한 구독 설정
        // stompClient.subscribe(`/topic/${roomId}`, (msg: any) => {
        //   const receivedMessage: ChatMessage = JSON.parse(msg.body); // 수신한 메시지를 파싱
        //   setMessages((prevMessages) => [...prevMessages, receivedMessage]); // 수신한 메시지를 메시지 배열에 추가
        // });
      },
      (error: any) => {
        console.error("WebSocket connection error:", error);
      }
    );

    setStompClient(stompClient); // STOMP 클라이언트를 상태로 저장

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      console.log("4");
      // 연결 상태를 확인한 후 disconnect 호출
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [roomId]);

  // 메시지 전송 함수
  const sendMessage = () => {
    // userEmail과 roomId가 없으면 메시지 전송하지 않음
    if (!stompClient || !message.trim() || !roomId || !userEmail) {
      console.error("Cannot send message: missing roomId or userEmail");
      return;
    }

    const chatMessage: ChatMessage = {
      senderEmail: userEmail, // 발신자 이메일
      content: message, // 메시지 내용
      roomId: roomId, // 채팅방 ID
    };

    stompClient.send(
      `/app/chat.sendMessage/${roomId}`,
      {},
      JSON.stringify(chatMessage)
    ); // 서버로 메시지 전송
    setMessage(""); // 메시지 입력창 초기화
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderEmail}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
