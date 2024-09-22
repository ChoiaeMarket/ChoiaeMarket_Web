import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetMyBoardListResponseDto extends ResponseDto {
  myList: BoardListItem[];
}
