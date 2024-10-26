import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatService } from "../services/ChatService";
import useLoginUserStore from "../stores/login-user.store";
import { getMessagesRequest as getMessageRequest } from "../apis";
import { useCookies } from "react-cookie";
import { GetMessageResponseDto } from "apis/response/chat";
import { ResponseDto } from "apis/response";

const ChatRoom = () => {
  const { roomId } = useParams<{
    roomId: string;
  }>();
  const { loginUser } = useLoginUserStore(); // 로그인 유저 상태
  const [messages, setMessages] = useState<
    { senderEmail: string; content: string; timestamp: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [cookies, setCookies] = useCookies();

  // WebSocket을 통해 메시지를 수신
  const { sendMessage } = useChatService(roomId as string, (message) => {
    message.timestamp = new Date().toISOString();
    const formattedMessages = formatMessage(message);
    message.timestamp = formattedMessages.timestamp;
    setMessages((prev) => [...prev, message]);
  });

  // 메시지 가져오기 응답 처리 함수
  const getMessageResponse = (
    responseBody: GetMessageResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      console.error("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code !== "SU") {
      console.error("Failed to fetch messages:", responseBody);
      return;
    }

    const { messages } = responseBody as GetMessageResponseDto;
    const formattedMessages = messages.map((msg: any) => formatMessage(msg));
    setMessages(formattedMessages);
  };

  // 메시지를 가져오는 useEffect
  useEffect(() => {
    if (loginUser && roomId) {
      getMessageRequest(roomId, cookies.accessToken).then(getMessageResponse);
    }
  }, [roomId, loginUser]);

  // 타임스탬프를 포맷팅
  const formatMessage = (msg: any) => {
    const date = new Date(msg.timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHour = hours % 12 || 12; // 12시간제로 변환
    const formattedMinute = String(minutes).padStart(2, "0"); // 2자리로 포맷
    const timeString = `${ampm} ${formattedHour}:${formattedMinute}`;

    return {
      senderEmail: msg.senderEmail,
      content: msg.message,
      timestamp: timeString,
    };
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && loginUser!.email) {
      sendMessage(loginUser!.email, inputMessage);
      setInputMessage(""); // 메시지 보낸후 비우기
    } else if (!loginUser!.email) {
      console.error("User email is undefined.");
    }
  };

  return (
    <div>
      <h1>Chat Room {roomId}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.senderEmail} {msg.timestamp} {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder=""
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
