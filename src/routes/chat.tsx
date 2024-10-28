import { ResponseDto } from "../apis/response";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useLoginUserStore from "../stores/login-user.store";
import styled from "styled-components";
import ChatRoomListItem from "types/interface/chatroom-list-item.interface";
import { getChatRoomListRequest } from "../apis";
import { GetChatRoomListResponseDto } from "../apis/response/chat";
import logo from "../assets/logo/logoWhite.png";

const Wrapper = styled.div`
  height: 100%;
  min-height: 99vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 326px;
  padding: 44px 0px 68px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 34px;
  height: 34px;
`;

const Title = styled.h1`
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 56px;
  letter-spacing: 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatBoard = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.025em;
`;

const ChatList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Seller = styled.div`
  width: 390px;
  height: 140px;
  padding: 20px 32px;
  border-bottom: 1px solid #252932;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.2s;
`;

const Sellerimg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const SellerNickname = styled.div`
  width: 214px;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0;
  margin: 0 0 8px 12px;
`;

const SellerLast = styled.div`
  width: 214px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.025em;
  color: #9ea3b2;
  margin: 0 0 24px 12px;
  overflow: hidden; /* 텍스트가 넘칠 경우 생략 */
  white-space: nowrap; /* 텍스트가 한 줄을 넘어갈 때 줄 바꿈 방지 */
  text-overflow: ellipsis; /* 생략 부분에 ellipsis(...) 표시 */
`;

export default function Chat() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore(); // 로그인 유저 상태
  const [chatRoomUserList, setChatRoomUserList] = useState<
    {
      id: number;
      email: string;
      nickname: string;
      profileImage: string | null;
    }[]
  >([]);
  const [cookies, setCookies] = useCookies();

  const getChatRoomListResponse = (
    responseBody: GetChatRoomListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      console.error("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    if (code !== "SU") {
      console.error("Failed to fetch messages:", responseBody);
      return;
    }

    const { chatRoomList } = responseBody as GetChatRoomListResponseDto;
    console.log(chatRoomList);
    const updatedChatRoomList = chatRoomList.map((chatRoom) => {
      const user =
        chatRoom.user1.email === loginUser!.email
          ? chatRoom.user2
          : chatRoom.user1; // 로그인된 유저와 다른 유저 선택
      return {
        id: chatRoom.id,
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
      };
    });
    setChatRoomUserList(updatedChatRoomList);
  };

  useEffect(() => {
    if (loginUser) {
      getChatRoomListRequest(loginUser.email, cookies.accessToken).then(
        getChatRoomListResponse
      );
    }
  }, [loginUser, cookies.accessToken]);

  const handleSearch = () => {
    navigate("/search");
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <Logo src={logo} alt="로고" />
          <Title>채팅</Title>
        </MenuItem>
        <MenuItem>
          <MenuItem onClick={handleSearch} style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 20L16.8033 15.8033M19 10.5C19 6.35786 15.6421 3 11.5 3C7.35786 3 4 6.35786 4 10.5C4 14.6421 7.35786 18 11.5 18C15.6421 18 19 14.6421 19 10.5Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </MenuItem>
          <MenuItem style={{ marginLeft: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.75 17.25V8.85714C5.75 5.49919 8.534 2.75 12 2.75C15.466 2.75 18.25 5.49919 18.25 8.85714V17.25H5.75Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M14 19C14 20.1067 13.1067 21 12 21C10.8933 21 10 20.1067 10 19H14Z"
                fill="white"
              />
              <rect
                x="2.5"
                y="16.5"
                width="19"
                height="1"
                rx="0.5"
                stroke="white"
              />
            </svg>
          </MenuItem>
        </MenuItem>
      </Menu>
      <ChatBoard>채팅 목록</ChatBoard>
      <ChatList>
        {chatRoomUserList.map((room) => (
          <Seller key={room.id} onClick={() => handleRoomClick(room.id)}>
            <Sellerimg
              src={
                room.profileImage
                  ? room.profileImage
                  : `/src/assets/member/default.png` // 대체 이미지 설정
              }
            />
            <div>
              <SellerNickname>{room.nickname}</SellerNickname>
              <SellerLast></SellerLast>
            </div>
          </Seller>
        ))}
      </ChatList>
    </Wrapper>
  );
}
