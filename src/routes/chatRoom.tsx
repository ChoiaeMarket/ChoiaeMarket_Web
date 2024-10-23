import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { userEmail } = useParams();

  return (
    <div>
      <h1>Chat {userEmail}</h1>
      {/* 메시지 목록 및 전송 UI 구현 */}
    </div>
  );
}
