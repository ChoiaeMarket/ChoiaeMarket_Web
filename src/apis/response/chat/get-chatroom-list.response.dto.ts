import ChatRoomListItem from "types/interface/chatroom-list-item.interface";
import ResponseDto from "../response.dto";

export default interface GetChatRoomListResponseDto extends ResponseDto {
  chatRoomList: ChatRoomListItem[]; // 채팅방 리스트
}
