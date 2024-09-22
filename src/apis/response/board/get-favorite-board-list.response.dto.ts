import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetFavoriteBoardListResponseDto extends ResponseDto {
  favoriteList: BoardListItem[];
}
