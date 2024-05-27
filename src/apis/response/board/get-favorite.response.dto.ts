import Favorite from "types/interface/favorite.interface";
import ResponseDto from "../response.dto";

export default interface GetFavoriteResponseDto extends ResponseDto, Favorite {
  favorite: boolean;
}
