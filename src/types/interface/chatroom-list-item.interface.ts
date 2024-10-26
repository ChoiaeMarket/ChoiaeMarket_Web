import User from "./user.interface";

export default interface ChatRoomListItem {
  id: number; // 채팅방 ID
  user1: User; // 첫 번째 유저 이메일
  user2: User; // 두 번째 유저 이메일
  createdAt: string; // 채팅방 생성 시간 (ISO 8601 형식의 문자열)
}
