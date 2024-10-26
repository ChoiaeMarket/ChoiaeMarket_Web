import ResponseDto from "../response.dto";

export default interface PostChatResponseDto extends ResponseDto {
  chatRoomId: number; // 채팅방 ID
}
