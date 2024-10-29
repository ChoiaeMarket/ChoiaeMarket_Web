import User from "./user.interface";

export default interface ChatRoomListItem {
  id: number; // 채팅방 ID
  user1: User; // 첫 번째 유저 이메일
  user2: User; // 두 번째 유저 이메일
  lastMessage: string; // 채팅방 마지막 문자
  lastTimestamp: string; // 채팅방 마지막 문자 시간 (ISO 8601 형식의 문자열)
}
