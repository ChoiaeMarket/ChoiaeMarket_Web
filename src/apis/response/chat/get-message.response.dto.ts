import ResponseDto from "../response.dto";

interface Message {
  id: number;
  chatRoomId: string;
  senderEmail: string;
  message: string;
  timestamp: string;
}

export default interface GetMessageResponseDto extends ResponseDto {
  messages: Message[]; // 메시지 배열
}
