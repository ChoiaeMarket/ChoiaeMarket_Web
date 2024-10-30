import axios, { AxiosResponse } from "axios";
import {
  CheckCertificationRequestDto,
  EmailCertificationRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from "./request/auth";
import { PatchBoardRequestDto, PostBoardRequestDto } from "./request/board";
import PostChatRoomRequestDto from "./request/chat/post-chat-room.request.dto";
import {
  PatchProfileImageRequestDto,
  PatchProfileRequestDto,
} from "./request/user";
import { ResponseDto } from "./response";
import {
  CheckCertificationResponseDto,
  EmailCertificationResponseDto,
  SignInResponseDto,
  SignUpResponseDto,
} from "./response/auth";
import EmailCheckResponseDto from "./response/auth/email-check.response.dto";
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
import {
  GetChatRoomListResponseDto,
  GetMessageResponseDto,
} from "./response/chat";
import PostChatRoomResponseDto from "./response/chat/post-chat.response.dto";
import {
  GetPopularListResponseDto,
  GetRelationListResponseDto,
} from "./response/search";
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
  PatchProfileImageResponseDto,
  PatchProfileResponseDto,
} from "./response/user";

const responseHandler = <T>(response: AxiosResponse<any, any>) => {
  const responseBody: T = response.data;
  return responseBody;
};

const errorHandler = (error: any) => {
  if (!error.response.data) return null;
  const responseBody: ResponseDto = error.response.data;
  return responseBody;
};

const DOMAIN = "http://localhost:4000";
const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const EMAIL_CHECK_URL = (email: string) =>
  `${API_DOMAIN}/auth/email-check/${email}`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
export const SNS_SIGN_IN_URL = (type: "kakao" | "naver") =>
  `${API_DOMAIN}/auth/oauth2/${type}`;

export const checkCertificationRequest = async (
  requestBody: CheckCertificationRequestDto
) => {
  const result = await axios
    .post(CHECK_CERTIFICATION_URL(), requestBody)
    .then(responseHandler<CheckCertificationResponseDto>)
    .catch(errorHandler);
  return result;
};

export const emailCertificationRequest = async (
  requestBody: EmailCertificationRequestDto
) => {
  const result = await axios
    .post(EMAIL_CERTIFICATION_URL(), requestBody)
    .then(responseHandler<EmailCertificationResponseDto>)
    .catch(errorHandler);
  return result;
};

export const emailCheckRequest = async (email: string) => {
  const result = await axios
    .get(EMAIL_CHECK_URL(email))
    .then(responseHandler<EmailCheckResponseDto>)
    .catch(errorHandler);
  return result;
};

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then(responseHandler<SignInResponseDto>)
    .catch(errorHandler);
  return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), {
      ...requestBody,
      gender: requestBody.gender === "0" ? 0 : 1, // 성별 → 숫자
      agreed_personal: requestBody.agreedPersonal ? 1 : 0, // 개인정보 동의 여부 → 숫자
    })
    .then(responseHandler<SignUpResponseDto>)
    .catch(errorHandler);
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
    .then(responseHandler<DeleteBoardResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getBoardListRequest = async () => {
  const result = await axios
    .get(GET_BOARD_LIST_URL())
    .then(responseHandler<GetBoardListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then(responseHandler<GetBoardResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getFavoriteBoardListRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_FAVORITE_BOARD_LIST_URL(), authorization(accessToken))
    .then(responseHandler<GetFavoriteBoardListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .get(GET_FAVORITE_URL(boardNumber), authorization(accessToken))
    .then(responseHandler<GetFavoriteResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getSearchBoardListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
    .then(responseHandler<GetSearchBoardListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getUserBoardListRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_BOARD_LIST_URL(email))
    .then(responseHandler<GetUserBoardListResponseDto>)
    .catch(errorHandler);
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
    .then(responseHandler<PatchBoardResponseDto>)
    .catch(errorHandler);
  return result;
};

export const postBoardRequest = async (
  requestBody: PostBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then(responseHandler<PostBoardResponseDto>)
    .catch(errorHandler);
  return result;
};

export const putFavoriteRequest = async (
  boardNumber: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then(responseHandler<PutFavoriteResponseDto>)
    .catch(errorHandler);
  return result;
};

const GET_CHAT_ROOM_LIST_URL = (email: string) =>
  `${API_DOMAIN}/chat/room-list/${email}`;
const GET_MESSAGES_URL = (roomId: string) =>
  `${API_DOMAIN}/chat/room/${roomId}/messages`;
const POST_CHAT_ROOM_URL = () => `${API_DOMAIN}/chat/room`;

export const getChatRoomListRequest = async (
  email: string,
  accessToken: string
) => {
  const result = await axios
    .get(GET_CHAT_ROOM_LIST_URL(email), authorization(accessToken))
    .then(responseHandler<GetChatRoomListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getMessagesRequest = async (
  roomId: string,
  accessToken: string
) => {
  const result = await axios
    .get(GET_MESSAGES_URL(roomId), authorization(accessToken))
    .then(responseHandler<GetMessageResponseDto>)
    .catch(errorHandler);
  return result;
};

export const postChatRoomRequest = async (
  requestBody: PostChatRoomRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_CHAT_ROOM_URL(), requestBody, authorization(accessToken))
    .then(responseHandler<PostChatRoomResponseDto>)
    .catch(errorHandler);
  return result;
};

const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation-list`;

export const getPopluarListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_LIST_URL())
    .then(responseHandler<GetPopularListResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getRelationListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then(responseHandler<GetRelationListResponseDto>)
    .catch(errorHandler);
  return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;
const PATCH_PROFILE_URL = () => `${API_DOMAIN}/user/profile`;
const PATCH_PROFILE_IMAGE_URL = () => `${API_DOMAIN}/user/profile-image`;

export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then(responseHandler<GetSignInUserResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getUserRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_URL(email))
    .then(responseHandler<GetUserResponseDto>)
    .catch(errorHandler);
  return result;
};

export const patchProfileRequest = async (
  requestBody: PatchProfileRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_PROFILE_URL(), requestBody, authorization(accessToken))
    .then(responseHandler<PatchProfileResponseDto>)
    .catch(errorHandler);
  return result;
};

export const patchProfileImageRequest = async (
  requestBody: PatchProfileImageRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(PATCH_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
    .then(responseHandler<PatchProfileImageResponseDto>)
    .catch(errorHandler);
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
    .then(responseHandler<string>)
    .catch(errorHandler);
  return result;
};
