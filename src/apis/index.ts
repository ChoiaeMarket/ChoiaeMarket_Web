import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { PatchBoardRequestDto, PostBoardRequestDto } from "./request/board";
import PostChatRoomRequestDto from "./request/chat/post-chat-room.request.dto";
import {
  PatchNicknameRequestDto,
  PatchProfileImageRequestDto,
} from "./request/user";
import { ResponseDto } from "./response";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import {
  DeleteBoardResponseDto,
  GetBoardListResponseDto,
  GetFavoriteBoardListResponseDto,
  GetSearchBoardListResponseDto,
  PatchBoardResponseDto,
  PostBoardResponseDto,
  PutFavoriteResponseDto,
} from "./response/board";
import GetBoardResponseDto from "./response/board/get-board.response.dto";
import GetFavoriteResponseDto from "./response/board/get-favorite.response.dto";
import GetUserBoardListResponseDto from "./response/board/get-user-board-list.response.dto";
import { GetMessageResponseDto } from "./response/chat";
import PostChatRoomResponseDto from "./response/chat/post-chat.response.dto";
import {
  GetPopularListResponseDto,
  GetRelationListResponseDto,
} from "./response/search";
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
  PatchNicknameResponseDto,
  PatchProfileImageResponseDto,
} from "./response/user";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), {
      ...requestBody,
      gender: requestBody.gender === "0" ? 0 : 1, // 성별 → 숫자
      agreed_personal: requestBody.agreedPersonal ? 1 : 0, // 개인정보 동의 여부 → 숫자
    })
    .then((response) => {
      const responseBody: SignUpResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const DELETE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const GET_BOARD_LIST_URL = () => `${API_DOMAIN}/board/board-list`;
const GET_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const GET_FAVORITE_BOARD_LIST_URL = () => `${API_DOMAIN}/board/favorite-list`;
const GET_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;
const GET_SEARCH_BOARD_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${API_DOMAIN}/board/search-list/${searchWord}${
    preSearchWord ? "/" + preSearchWord : ""
  }`;
const GET_USER_BOARD_LIST_URL = (email: string) =>
  `${API_DOMAIN}/board/user-board-list/${email}`;
const PATCH_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const PUT_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;

export const deleteBoardRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
    .then((response) => {
      const responseBody: DeleteBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getBoardListRequest = async () => {
  const result = await axios
    .get(GET_BOARD_LIST_URL())
    .then((response) => {
      const responseBody: GetBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getFavoriteBoardListRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_FAVORITE_BOARD_LIST_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: GetFavoriteBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .get(GET_FAVORITE_URL(boardNumber), authorization(accessToken))
    .then((response) => {
      const responseBody: GetFavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getSearchBoardListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
    .then((response) => {
      const responseBody: GetSearchBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getUserBoardListRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_BOARD_LIST_URL(email))
    .then((response) => {
      const responseBody: GetUserBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const patchBoardRequest = async (
  boardNumber: number | string,
  requestBody: PatchBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(
      PATCH_BOARD_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: PatchBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postBoardRequest = async (
  requestBody: PostBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PostBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const putFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then((response) => {
      const responseBody: PutFavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const GET_MESSAGES_URL = (roomId: string) =>
  `${API_DOMAIN}/chat/room/${roomId}/messages`;
const POST_CHAT_ROOM_URL = () => `${API_DOMAIN}/chat/room`;

export const getMessagesRequest = async (
  roomId: string,
  accessToken: string
) => {
  const result = await axios
    .get(GET_MESSAGES_URL(roomId), authorization(accessToken))
    .then((response) => {
      const responseBody: GetMessageResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postChatRoomRequest = async (
  requestBody: PostChatRoomRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_CHAT_ROOM_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PostChatRoomResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getPopluarListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_LIST_URL())
    .then((response) => {
      const responseBody: GetPopularListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getRelationListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then((response) => {
      const responseBody: GetRelationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const PATCH_NICKNAME_URL = () => `${API_DOMAIN}/user/nickname`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;

export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getUserRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_URL(email))
    .then((response) => {
      const responseBody: GetUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const patchNicknameRequest = async (
  requestBody: PatchNicknameRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_NICKNAME_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PatchNicknameResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const patchProfileImageRequest = async (
  requestBody: PatchProfileImageRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PatchProfileImageResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 파일 업로드
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const fileUploadRequest = async (data: FormData) => {
  const result = await axios
    .post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      return null;
    });
  return result;
};
